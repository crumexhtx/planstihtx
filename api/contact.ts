import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  CONTACT_LIMITS,
  validateContactSubmission,
} from '../src/utils/contactValidation';
import { checkRateLimit, pruneRateLimits } from './_lib/rateLimit';

const GENERIC_ERROR = 'Your message could not be sent. Please try again later.';
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 15 * 60 * 1_000;

export const config = {
  maxDuration: 10,
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');

    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return response.status(405).json({ error: GENERIC_ERROR });
    }

    const clientKey = clientRateLimitKey(request);
    pruneRateLimits();
    const rate = checkRateLimit(clientKey, RATE_LIMIT, RATE_WINDOW_MS);
    if (!rate.allowed) {
      response.setHeader('Retry-After', String(rate.retryAfterSeconds));
      return response.status(429).json({ error: GENERIC_ERROR });
    }

    const contentType = firstHeader(request.headers['content-type']);
    if (!contentType?.toLowerCase().includes('application/json')) {
      return response.status(415).json({ error: GENERIC_ERROR });
    }

    const declaredLengthHeader = firstHeader(request.headers['content-length']);
    if (declaredLengthHeader !== undefined) {
      const declaredLength = Number(declaredLengthHeader);
      if (
        !Number.isFinite(declaredLength) ||
        declaredLength < 0 ||
        declaredLength > CONTACT_LIMITS.bodyBytes
      ) {
        return response.status(413).json({ error: GENERIC_ERROR });
      }
    }

    let body: unknown;
    try {
      body = parseBody(request.body);
      const serializedBody = JSON.stringify(body);
      if (
        typeof serializedBody !== 'string' ||
        Buffer.byteLength(serializedBody, 'utf8') > CONTACT_LIMITS.bodyBytes
      ) {
        return response.status(413).json({ error: GENERIC_ERROR });
      }
    } catch {
      return response.status(400).json({ error: GENERIC_ERROR });
    }

    const validation = validateContactSubmission(body);
    if (validation.success === false) {
      // Do not tell automated senders which anti-spam check they triggered.
      if (validation.reason === 'spam') {
        return response.status(200).json({ ok: true });
      }
      return response.status(400).json({ error: GENERIC_ERROR });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const to = process.env.CONTACT_TO_EMAIL?.trim();
    const from = process.env.CONTACT_FROM_EMAIL?.trim();
    if (!apiKey || !to || !from) {
      console.error('Contact email environment is not configured.');
      await reportContactError('configuration', 'MissingEnvironment');
      return response.status(500).json({ error: GENERIC_ERROR });
    }

    const { name, email, category, message } = validation.data;
    const text = [
      `Category: ${category}`,
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n');
    const html = `<h2>New Plansti contact message</h2>
<p><strong>Category:</strong> ${escapeHtml(category)}</p>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`;

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Plansti contact: ${category}`,
        text,
        html,
      });

      if (result.error) {
        console.error('Resend rejected a contact email:', result.error.name);
        await reportContactError('delivery', result.error.name);
        return response.status(502).json({ error: GENERIC_ERROR });
      }

      return response.status(200).json({ ok: true });
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'UnknownError';
      console.error('Contact email delivery failed:', errorName);
      await reportContactError('delivery', errorName);
      return response.status(500).json({ error: GENERIC_ERROR });
    }
  } catch (error) {
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    console.error('Contact handler crashed:', errorName);
    try {
      await reportContactError('handler', errorName);
    } catch {
      // Ignore secondary reporting failures.
    }
    if (!response.headersSent) {
      return response.status(500).json({ error: GENERIC_ERROR });
    }
  }
}

async function reportContactError(stage: string, errorName: string) {
  const sentryDsn = process.env.SENTRY_DSN?.trim();
  if (!sentryDsn) return;

  try {
    const Sentry = await import('@sentry/node');
    if (!Sentry.getClient()) {
      Sentry.init({
        dsn: sentryDsn,
        environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
        tracesSampleRate: 0,
        sendDefaultPii: false,
      });
    }

    Sentry.withScope((scope) => {
      scope.setTag('contact_stage', stage);
      scope.setTag('original_error_name', errorName);
      Sentry.captureException(new Error(`Contact API ${stage} failure`));
    });
    await Sentry.flush(2_000);
  } catch (error) {
    console.error(
      'Failed to report contact error to Sentry:',
      error instanceof Error ? error.name : 'UnknownError',
    );
  }
}

function clientRateLimitKey(request: VercelRequest): string {
  const forwarded = firstHeader(request.headers['x-forwarded-for']);
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return `ip:${first}`;
  }

  const realIp = firstHeader(request.headers['x-real-ip']);
  if (realIp) return `ip:${realIp}`;

  return 'ip:unknown';
}

function parseBody(body: unknown): unknown {
  if (typeof body === 'string') return JSON.parse(body);
  if (Buffer.isBuffer(body)) return JSON.parse(body.toString('utf8'));
  return body;
}

function firstHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
