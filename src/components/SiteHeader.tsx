import { useEffect, useId, useRef, useState } from 'react';
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
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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

  return (
    <header className="app-shell__brand">
      <div className="app-shell__brand-copy">
        <p className="app-shell__brand-mark">
          <NavLink to="/" className="app-shell__brand-link">
            Plansti
          </NavLink>
        </p>
        <h1>{title}</h1>
      </div>
      <div className="app-shell__actions">
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
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={theme === 'light'}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
