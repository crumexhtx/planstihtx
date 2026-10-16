import { afterEach, describe, expect, it, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearFxCache } from '../../api/_lib/fxCache';
import { planningExchangeRates } from '../../api/_lib/fxRates';
import fxHandler from '../../api/fx';

afterEach(() => {
  clearFxCache();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function createFxRequest(): VercelRequest {
  return {
    method: 'GET',
    headers: { 'x-forwarded-for': `vitest-${Math.random()}` },
  } as unknown as VercelRequest;
}

function createResponse() {
  const headers: Record<string, string> = {};
  const response = {
    headers,
    statusCode: 200,
    body: undefined as unknown,
    headersSent: false,
    setHeader(key: string, value: string) {
      headers[key.toLowerCase()] = value;
      return response;
    },
    status(code: number) {
      response.statusCode = code;
      return response;
    },
    json(payload: unknown) {
      response.body = payload;
      response.headersSent = true;
      return response;
    },
  };
  return response as unknown as typeof response & VercelResponse;
}

describe('API handler modules', () => {
  it('imports each serverless handler without a load-time failure', async () => {
    const fx = await import('../../api/fx.ts');
    const contact = await import('../../api/contact.ts');

    expect(typeof fx.default).toBe('function');
    expect(typeof contact.default).toBe('function');
  });
});

describe('GET /api/fx', () => {
  it('returns planning rates with status 200 when the upstream fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('FrankfurterUnavailable'))),
    );

    const response = createResponse();
    await fxHandler(createFxRequest(), response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(planningExchangeRates());
  });
});
