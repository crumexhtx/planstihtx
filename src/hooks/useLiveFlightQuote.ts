import { useEffect, useState } from 'react';
import {
  isFlightQuote,
  type FlightQuote,
  type FlightSearchRequest,
} from '../utils/flightQuotes';
import { trackAnalyticsEventOnce } from '../utils/observability';

export type LiveFlightStatus = 'idle' | 'loading' | 'ready' | 'fallback';

interface UseLiveFlightQuoteResult {
  quote: FlightQuote | null;
  status: LiveFlightStatus;
}

export function useLiveFlightQuote(
  request: FlightSearchRequest | null,
  enabled: boolean,
): UseLiveFlightQuoteResult {
  const [quote, setQuote] = useState<FlightQuote | null>(null);
  const [status, setStatus] = useState<LiveFlightStatus>('idle');

  useEffect(() => {
    if (!enabled || !request) {
      setQuote(null);
      setStatus('idle');
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/flights/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(request),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP${response.status}`);
        const payload: unknown = await response.json();
        if (!isFlightQuote(payload)) throw new Error('InvalidFlightQuote');

        setQuote(payload);
        if (payload.available && (payload.source === 'live' || payload.source === 'cached')) {
          setStatus('ready');
          trackAnalyticsEventOnce(
            'flight_quote_loaded',
            `${payload.originIata}-${payload.destinationIata}-${payload.source}`,
            {
              source: payload.source,
              origin: payload.originIata,
              destination: payload.destinationIata,
            },
          );
        } else {
          setStatus('fallback');
          trackAnalyticsEventOnce(
            'flight_quote_fallback',
            `${payload.originIata}-${payload.destinationIata}-${payload.source}`,
            {
              source: payload.source,
              configured: payload.configured ?? false,
            },
          );
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setQuote(null);
        setStatus('fallback');
        trackAnalyticsEventOnce('flight_quote_fallback', 'client_error', {
          failure_type: error instanceof Error ? error.name : 'UnknownError',
        });
      }
    }, 400);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [
    enabled,
    request?.originIata,
    request?.destinationIata,
    request?.departureDate,
    request?.returnDate,
    request?.adults,
  ]);

  return { quote, status };
}

export default useLiveFlightQuote;
