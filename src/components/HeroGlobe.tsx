/** Inline SVG globe so the hero never waits on an emoji font or raster image. */
export function HeroGlobe() {
  return (
    <svg
      className="travel-hero__earth"
      width="320"
      height="320"
      viewBox="0 0 320 320"
      role="presentation"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-globe-ocean" cx="32%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#7ec8e3" />
          <stop offset="55%" stopColor="#2f7f9e" />
          <stop offset="100%" stopColor="#1b4f66" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="148" fill="url(#hero-globe-ocean)" />
      <path
        fill="#7fbf6a"
        d="M86 92c22-18 48-12 68-6 14 4 28-8 44-4 18 5 22 24 12 38-14 20-46 8-66 20-18 11-18 38-38 42-22 5-40-18-32-42 4-14 4-32 12-48Z"
      />
      <path
        fill="#8ecf78"
        d="M196 168c18-4 38 8 52 24 10 12 8 32-6 40-16 10-34 2-48-8-16-12-36-10-42-28-4-14 18-24 44-28Z"
      />
      <path
        fill="rgba(255,255,255,0.22)"
        d="M64 128c18-8 40 0 38 16-2 14-22 16-36 12-16-4-20-20-2-28Z"
      />
      <circle
        cx="160"
        cy="160"
        r="148"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="6"
      />
    </svg>
  );
}

export default HeroGlobe;
