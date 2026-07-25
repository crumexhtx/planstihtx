import type { FlightQuote, FlightSearchRequest } from '../../src/utils/flightQuotes';

const DEFAULT_HOST = 'https://test.api.amadeus.com';

interface TokenState {
  accessToken: string;
  expiresAt: number;
}

let tokenState: TokenState | null = null;

export function amadeusConfigured(): boolean {
  return Boolean(
    process.env.AMADEUS_CLIENT_ID?.trim() &&
      process.env.AMADEUS_CLIENT_SECRET?.trim(),
  );
}

function amadeusHost(): string {
  const host = process.env.AMADEUS_API_HOST?.trim();
  return (host || DEFAULT_HOST).replace(/\/$/, '');
}

export async function searchAmadeusRoundTrip(
  request: FlightSearchRequest,
): Promise<FlightQuote> {
  if (!amadeusConfigured()) {
    return {
      source: 'unavailable',
      available: false,
      amountUsd: 0,
      currency: 'USD',
      asOf: new Date().toISOString(),
      label: 'Live fares not configured',
      originIata: request.originIata,
      destinationIata: request.destinationIata,
      departureDate: request.departureDate,
      returnDate: request.returnDate,
      adults: request.adults,
      configured: false,
      message: 'Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to enable live fares.',
    };
  }

  const token = await getAccessToken();
  const params = new URLSearchParams({
    originLocationCode: request.originIata,
    destinationLocationCode: request.destinationIata,
    departureDate: request.departureDate,
    returnDate: request.returnDate,
    adults: String(request.adults),
    currencyCode: 'USD',
    max: '10',
  });

  const response = await fetch(
    `${amadeusHost()}/v2/shopping/flight-offers?${params}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorName = `AmadeusHTTP${response.status}`;
    throw new Error(errorName);
  }

  const payload = (await response.json()) as {
    data?: AmadeusOffer[];
  };
  const offers = Array.isArray(payload.data) ? payload.data : [];
  const best = pickCheapestUsdOffer(offers);

  if (!best) {
    return {
      source: 'live',
      available: false,
      amountUsd: 0,
      currency: 'USD',
      asOf: new Date().toISOString(),
      label: 'No live fares found',
      originIata: request.originIata,
      destinationIata: request.destinationIata,
      departureDate: request.departureDate,
      returnDate: request.returnDate,
      adults: request.adults,
      configured: true,
      provider: 'amadeus',
      message: 'No offers returned for these dates.',
    };
  }

  return {
    source: 'live',
    available: true,
    amountUsd: best.amountUsd,
    currency: 'USD',
    asOf: new Date().toISOString(),
    label: best.carrier
      ? `Live round-trip from ${best.carrier}`
      : 'Live round-trip fare',
    carrier: best.carrier,
    originIata: request.originIata,
    destinationIata: request.destinationIata,
    departureDate: request.departureDate,
    returnDate: request.returnDate,
    adults: request.adults,
    outboundStops: best.outboundStops,
    returnStops: best.returnStops,
    configured: true,
    provider: 'amadeus',
  };
}

interface AmadeusOffer {
  price?: { grandTotal?: string; currency?: string; total?: string };
  validatingAirlineCodes?: string[];
  itineraries?: Array<{
    segments?: Array<unknown>;
  }>;
}

function pickCheapestUsdOffer(offers: AmadeusOffer[]) {
  let best:
    | {
        amountUsd: number;
        carrier?: string;
        outboundStops: number;
        returnStops: number;
      }
    | undefined;

  for (const offer of offers) {
    const currency = offer.price?.currency?.toUpperCase();
    const raw = offer.price?.grandTotal ?? offer.price?.total;
    const amount = Number(raw);
    if (currency && currency !== 'USD') continue;
    if (!Number.isFinite(amount) || amount <= 0) continue;

    const outboundStops = Math.max(
      0,
      (offer.itineraries?.[0]?.segments?.length ?? 1) - 1,
    );
    const returnStops = Math.max(
      0,
      (offer.itineraries?.[1]?.segments?.length ?? 1) - 1,
    );
    const carrier = offer.validatingAirlineCodes?.[0];
    if (!best || amount < best.amountUsd) {
      best = {
        amountUsd: Math.round(amount * 100) / 100,
        carrier,
        outboundStops,
        returnStops,
      };
    }
  }

  return best;
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenState && tokenState.expiresAt > now + 30_000) {
    return tokenState.accessToken;
  }

  const clientId = process.env.AMADEUS_CLIENT_ID!.trim();
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET!.trim();
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${amadeusHost()}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`AmadeusAuthHTTP${response.status}`);
  }

  const payload = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!payload.access_token) {
    throw new Error('AmadeusAuthMissingToken');
  }

  const expiresInSec =
    typeof payload.expires_in === 'number' && payload.expires_in > 0
      ? payload.expires_in
      : 1799;

  tokenState = {
    accessToken: payload.access_token,
    expiresAt: now + expiresInSec * 1000,
  };
  return tokenState.accessToken;
}
