export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="8" fill="#111520" />
      <path d="M8 10h16M8 16h12M8 22h8" stroke="#63abff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="16" r="3" fill="#7ee787" opacity="0.9" />
    </svg>
  );
}
