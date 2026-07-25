import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Privacy — Plansti"
        description="Learn what information Plansti processes and which service providers support the site."
        canonicalPath="/privacy"
      />
      <main className="static-page">
        <p className="cost-summary__eyebrow">Privacy</p>
        <h1>Privacy notice</h1>
        <p>
          This notice explains the limited information Plansti processes when
          you use the site or contact us.
        </p>

        <section className="static-page__section">
          <h2>Contact messages</h2>
          <p>
            When you submit the contact form, we process your name, email
            address, feedback category, message, and basic anti-spam timing
            information. The message is sent through Resend to the Plansti
            contact mailbox so we can read and respond to it. Resend processes
            this information as our email delivery provider. Do not include
            sensitive personal information in your message.
          </p>
        </section>

        <section className="static-page__section">
          <h2>Hosting and email delivery</h2>
          <p>
            Vercel hosts Plansti and may process technical request information
            such as IP address, browser details, requested URLs, and timestamps
            to deliver and secure the site. Resend processes contact form
            details to deliver the message to our mailbox. Vercel Web Analytics
            measures page use and a small set of product interactions without
            receiving contact contents or exact budget amounts. Sentry receives
            sampled performance data and unexpected application errors. Plansti
            does not use session replay or advertising trackers.
          </p>
        </section>

        <section className="static-page__section">
          <h2>How long contact messages are kept</h2>
          <p>
            Contact messages remain in the receiving mailbox for as long as
            reasonably needed to respond, maintain the conversation, address
            abuse, or meet applicable legal obligations. You may ask us to
            delete a message, although we may retain information when legally
            required.
          </p>
        </section>

        <section className="static-page__section">
          <h2>Browser storage</h2>
          <p>
            Plansti stores your light or dark theme choice in your browser’s
            local storage so the preference remains available on later visits.
            Contact messages are not stored in local storage. If you subscribe
            to the newsletter once a provider endpoint is configured, we may
            store a simple “subscribed” flag in local storage—not your email
            address—so the form can show confirmation on later visits.
          </p>
        </section>

        <section className="static-page__section">
          <h2>Newsletter (when enabled)</h2>
          <p>
            Newsletter signup is optional and only submits your email when a
            newsletter endpoint is configured. Until then, the form does not
            send your address anywhere. When enabled, the email is processed by
            the configured provider so we can send trip-planning updates. You
            can unsubscribe using the link in those emails.
          </p>
        </section>

        <section className="static-page__section">
          <h2>Travel data providers</h2>
          <p>
            Weather requests are sent to Open-Meteo using destination
            coordinates and forecast parameters. Destination imagery and
            attribution may be requested from Wikipedia and Wikimedia services.
            Currency conversion loads European Central Bank reference rates
            through the Frankfurter API (via Plansti’s `/api/fx` endpoint) and
            falls back to built-in planning rates when the live feed is
            unavailable. Those providers receive the technical information
            normally sent with a web request and handle it under their own
            privacy terms.
          </p>
        </section>

        <section className="static-page__section">
          <h2>Your choices</h2>
          <p>
            You can avoid sending a contact message, clear the saved theme in
            your browser settings, or block third-party requests using your
            browser controls. To ask about a contact message or request its
            deletion, use the <Link to="/contact">contact form</Link>.
          </p>
        </section>

        <p>
          <small>Last updated: July 25, 2026.</small>
        </p>
      </main>
    </>
  );
}

export default PrivacyPage;
