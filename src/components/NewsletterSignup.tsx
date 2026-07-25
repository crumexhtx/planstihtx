import { type FormEvent, useState } from 'react';
import {
  NEWSLETTER_ENDPOINT,
  NEWSLETTER_STORAGE_KEY,
  PARTNERS_EMAIL,
} from '../config/monetization';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'saved' | 'error' | 'unavailable'>(
    'idle',
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (website.trim()) {
      setStatus('saved');
      setEmail('');
      return;
    }

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
      setStatus('error');
      return;
    }

    if (!NEWSLETTER_ENDPOINT) {
      setStatus('unavailable');
      return;
    }

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'plansti' }),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }

      // Remember subscribe success locally without storing the email address.
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, 'subscribed');
      setStatus('saved');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter planner-panel" aria-labelledby="newsletter-heading">
      <header>
        <p className="cost-summary__eyebrow">Stay ahead of prices</p>
        <h2 id="newsletter-heading">Get budget trip alerts</h2>
        <p className="planner-help">
          Monthly destination deals, seasonal price swings, and new city guides.
        </p>
      </header>
      <form className="newsletter__form" onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus('idle');
            }}
            required
          />
        </label>
        <label className="visually-hidden" aria-hidden="true">
          Website
          <input
            type="text"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </label>
        <button type="submit">Subscribe</button>
      </form>
      {status === 'saved' && (
        <p className="newsletter__status" role="status">
          You’re on the list. We’ll only send trip-planning value.
        </p>
      )}
      {status === 'unavailable' && (
        <p className="newsletter__status" role="status">
          Newsletter signup is not open yet. Check back soon, or email{' '}
          {PARTNERS_EMAIL}.
        </p>
      )}
      {status === 'error' && (
        <p className="newsletter__status newsletter__status--error" role="alert">
          Enter a valid email to subscribe.
        </p>
      )}
    </section>
  );
}

export default NewsletterSignup;
