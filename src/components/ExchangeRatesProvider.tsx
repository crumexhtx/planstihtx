import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  isExchangeRatesSnapshot,
  mergeExchangeRates,
  planningExchangeRates,
  type ExchangeRatesSnapshot,
} from '../utils/exchangeRates';
import { trackAnalyticsEventOnce } from '../utils/observability';

interface ExchangeRatesContextValue {
  rates: ExchangeRatesSnapshot;
  status: 'loading' | 'ready' | 'fallback';
}

const ExchangeRatesContext = createContext<ExchangeRatesContextValue>({
  rates: planningExchangeRates(),
  status: 'loading',
});

const FRANKFURTER_URL = 'https://api.frankfurter.dev/v1/latest?base=USD';

export function ExchangeRatesProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<ExchangeRatesSnapshot>(() =>
    planningExchangeRates(),
  );
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadFromFrankfurterDirect(): Promise<ExchangeRatesSnapshot> {
      const response = await fetch(FRANKFURTER_URL, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`FrankfurterHTTP${response.status}`);
      const payload = (await response.json()) as {
        base?: string;
        date?: string;
        rates?: Record<string, number>;
      };
      if (
        payload.base !== 'USD' ||
        typeof payload.date !== 'string' ||
        !payload.rates
      ) {
        throw new Error('FrankfurterInvalidPayload');
      }
      return mergeExchangeRates(payload.rates, payload.date, 'live');
    }

    async function loadRates() {
      try {
        const response = await fetch('/api/fx', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`HTTP${response.status}`);
        const payload: unknown = await response.json();
        if (!isExchangeRatesSnapshot(payload)) {
          throw new Error('InvalidFxPayload');
        }
        setRates(payload);
        setStatus(payload.source === 'estimate' ? 'fallback' : 'ready');
        trackAnalyticsEventOnce('fx_rates_loaded', payload.source, {
          source: payload.source,
          fallback_count: payload.fallbackCurrencies.length,
        });
        return;
      } catch (error) {
        if (controller.signal.aborted) return;

        // Vite `npm run dev` does not serve `/api/*`; call Frankfurter directly.
        if (import.meta.env.DEV) {
          try {
            const direct = await loadFromFrankfurterDirect();
            setRates(direct);
            setStatus('ready');
            trackAnalyticsEventOnce('fx_rates_loaded', 'dev_direct', {
              source: 'live',
              fallback_count: direct.fallbackCurrencies.length,
            });
            return;
          } catch {
            // Fall through to planning rates.
          }
        }

        setRates(planningExchangeRates());
        setStatus('fallback');
        trackAnalyticsEventOnce('fx_rates_fallback', 'client_error', {
          failure_type: error instanceof Error ? error.name : 'UnknownError',
        });
      }
    }

    void loadRates();
    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ rates, status }), [rates, status]);

  return (
    <ExchangeRatesContext.Provider value={value}>
      {children}
    </ExchangeRatesContext.Provider>
  );
}

export function useExchangeRates(): ExchangeRatesContextValue {
  return useContext(ExchangeRatesContext);
}

export default ExchangeRatesProvider;
