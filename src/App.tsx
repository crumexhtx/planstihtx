import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { ExchangeRatesProvider } from './components/ExchangeRatesProvider';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const DestinationPage = lazy(() =>
  import('./pages/DestinationPage').then((module) => ({
    default: module.DestinationPage,
  })),
);
const DestinationsIndexPage = lazy(() =>
  import('./pages/DestinationsIndexPage').then((module) => ({
    default: module.DestinationsIndexPage,
  })),
);
const AboutPage = lazy(() =>
  import('./pages/AboutContactPages').then((module) => ({
    default: module.AboutPage,
  })),
);
const ContactPage = lazy(() =>
  import('./pages/AboutContactPages').then((module) => ({
    default: module.ContactPage,
  })),
);
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((module) => ({
    default: module.PrivacyPage,
  })),
);
const PartnersPage = lazy(() =>
  import('./pages/PartnersPage').then((module) => ({
    default: module.PartnersPage,
  })),
);
const CompareIndexPage = lazy(() =>
  import('./pages/ComparePage').then((module) => ({
    default: module.CompareIndexPage,
  })),
);
const ComparePage = lazy(() =>
  import('./pages/ComparePage').then((module) => ({
    default: module.ComparePage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);

const PAGE_TITLES: Record<string, string> = {
  '/': 'Estimate your trip cost before you book',
  '/destinations': 'City trip cost guides',
  '/compare': 'City trip cost comparisons',
  '/about': 'About Plansti',
  '/contact': 'Contact Plansti',
  '/partners': 'Partner with Plansti',
  '/privacy': 'Privacy notice',
};

function titleForPath(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith('/destinations/')) return 'Destination trip cost estimate';
  if (pathname.startsWith('/compare/')) return 'City trip cost comparison';
  return 'Plansti';
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      Loading…
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Read legacy theme keys once so returning visitors keep their preference.
    const savedTheme =
      localStorage.getItem('plansti.theme') ??
      localStorage.getItem('planora.theme') ??
      localStorage.getItem('budget-roamers.theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('plansti.theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <ExchangeRatesProvider>
        <SiteHeader
          title={titleForPath(location.pathname)}
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
          }
        />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/destinations" element={<DestinationsIndexPage />} />
            <Route
              path="/destinations/:destinationId"
              element={<DestinationPage theme={theme} />}
            />
            <Route path="/compare" element={<CompareIndexPage />} />
            <Route path="/compare/:slug" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <SiteFooter />
      </ExchangeRatesProvider>
    </div>
  );
}
