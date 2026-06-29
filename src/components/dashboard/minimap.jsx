export default function MiniMap() {
  return (
    <svg viewBox="0 0 400 220" className="h-44 w-full rounded-2xl overflow-hidden">
      <defs>
        <linearGradient id="mm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand)" stopOpacity="0.15" />
          <stop offset="1" stopColor="var(--brand-4)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#mm)" />
      <g stroke="oklch(0.85 0.01 60)" strokeWidth="1.5" fill="none">
        <path d="M0 60 L400 80" />
        <path d="M0 130 L400 110" />
        <path d="M0 190 L400 170" />
        <path d="M80 0 L120 220" />
        <path d="M240 0 L210 220" />
        <path d="M340 0 L320 220" />
      </g>
      <path
        d="M40 180 C 120 140, 200 160, 260 90 S 340 40, 370 50"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="3"
        strokeDasharray="6 6"
      />
      <circle cx="40" cy="180" r="7" fill="var(--brand-3)" />
      <circle cx="370" cy="50" r="7" fill="var(--brand)" />
      <circle cx="260" cy="90" r="10" fill="var(--brand-4)" stroke="white" strokeWidth="3" />
    </svg>
  );
}
