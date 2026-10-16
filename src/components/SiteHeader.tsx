import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';

export interface SiteHeaderProps {
  title: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NAV_LINKS: ReadonlyArray<{
  to: string;
  label: string;
  end?: boolean;
}> = [
  { to: '/', label: 'Home', end: true },
  { to: '/destinations', label: 'Cities' },
  { to: '/compare', label: 'Compare' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/partners', label: 'Partners' },
];

export function SiteHeader({
  title,
  theme,
  onToggleTheme,
}: SiteHeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [useMobilePortal, setUseMobilePortal] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalReady(true);
    const media = window.matchMedia('(max-width: 760px)');
    const syncMobile = () => setUseMobilePortal(media.matches);
    syncMobile();
    media.addEventListener('change', syncMobile);
    return () => media.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === 'undefined') {
      document.documentElement.style.setProperty('--site-header-height', '4.5rem');
      return;
    }

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    window.addEventListener('resize', syncHeaderHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncHeaderHeight);
    };
  }, [portalReady, useMobilePortal]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      setMenuOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  const header = (
    <header ref={headerRef} className="app-shell__brand">
      <div className="app-shell__brand-copy">
        <p className="app-shell__brand-mark">
          <NavLink to="/" className="app-shell__brand-link">
            Plansti
          </NavLink>
        </p>
        <p className="app-shell__page-title">{title}</p>
      </div>
      <div className="app-shell__actions">
        <button
          className="theme-toggle"
          type="button"
          aria-label={
            theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
          }
          aria-pressed={theme === 'light'}
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-2.5a1 1 0 1 1 0 2H18a1 1 0 1 1 0-2h1.5ZM7 12a1 1 0 0 1-1 1H4.5a1 1 0 1 1 0-2H6a1 1 0 0 1 1 1Zm9.6 5.1a1 1 0 0 1 1.4 1.4l-1.05 1.05a1 1 0 1 1-1.4-1.4Zm-10.2 0 1.05 1.05a1 1 0 0 1-1.4 1.4L5 18.5a1 1 0 0 1 1.4-1.4ZM12 17a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V18a1 1 0 0 1 1-1Zm5.6-10.1 1.05-1.05a1 1 0 1 1 1.4 1.4L19 8.3a1 1 0 1 1-1.4-1.4ZM6.4 6.9a1 1 0 0 1 1.4-1.4L8.85 6.55A1 1 0 0 1 7.45 8Z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.5 2.8a1 1 0 0 1 1.32 1.32A8.5 8.5 0 1 1 8.12 19.82 1 1 0 0 1 9.44 18.5 6.5 6.5 0 1 0 15.5 2.8Z"
              />
            </svg>
          )}
        </button>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__bars" aria-hidden="true" />
          <span className="visually-hidden">
            {menuOpen ? 'Close menu' : 'Open menu'}
          </span>
        </button>

        <div
          ref={menuRef}
          id={menuId}
          className={`app-shell__menu${menuOpen ? ' is-open' : ''}`}
        >
          <nav aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end === true}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );

  /*
   * On mobile, portal the full header (logo + burger) to document.body and
   * pin it with position:fixed so overflow-x: clip on .app-shell cannot stop
   * it following the viewport while scrolling.
   */
  if (portalReady && useMobilePortal) {
    return createPortal(header, document.body);
  }

  return header;
}

export default SiteHeader;
