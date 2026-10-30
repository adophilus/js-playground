import { cn } from '#/lib/utils'

export function Logo({
  className,
  variant = 'dark',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  const text = variant === 'dark' ? 'text-ink' : 'text-white'
  return (
    <span className={cn('inline-flex items-center gap-2', className, text)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="8" fill="currentColor" />
        <path
          d="M9 9h10M9 14h10M9 19h6"
          stroke={variant === 'dark' ? '#ffffff' : '#090909'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="20.5" cy="19" r="2.1" fill={variant === 'dark' ? '#1fc16b' : '#1fc16b'} />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">
        Gate<span className="text-[var(--orange)]">84</span>
      </span>
    </span>
  )
}
