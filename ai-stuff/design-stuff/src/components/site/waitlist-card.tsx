import { useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, Info, User } from 'lucide-react'
import { cn } from '#/lib/utils'

const AVATARS = [
  { initials: 'AO', bg: '#fff4f2', dot: '#1fc16b' },
  { initials: 'KD', bg: '#f3f2ff', dot: '#ff5c02' },
  { initials: 'MT', bg: '#e8f5e9', dot: '#1fc16b' },
  { initials: 'SB', bg: '#dfe0e2', dot: '#fb3748' },
]

function AvatarGroup() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        {AVATARS.map((a, i) => (
          <div
            key={i}
            className="relative -ml-2 first:ml-0 inline-flex size-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-ink/70"
            style={{ backgroundColor: a.bg }}
          >
            {a.initials}
            <span
              className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white"
              style={{ backgroundColor: a.dot }}
            />
          </div>
        ))}
        <span className="relative -ml-2 inline-flex h-8 items-center rounded-full border border-[var(--line)] bg-secondary px-3 text-[10px] font-semibold text-ink">
          +2K
        </span>
      </div>
    </div>
  )
}

export function WaitlistCard({
  className,
  title = 'Get Early Access',
  subtitle = 'Sign up to be one of the first to use Gate84',
  hint = 'Join 2,000+ founders, investors, and operators on the waitlist.',
  buttonLabel = 'Join Waitlist',
}: {
  className?: string
  title?: string
  subtitle?: string
  hint?: string
  buttonLabel?: string
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setSubmitted(true)
  }

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-[var(--line)] bg-white p-6',
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <AvatarGroup />

        <div>
          <h3 className="text-base font-medium text-ink">{title}</h3>
          <p className="mt-0.5 text-xs text-[var(--placeholder)]">{subtitle}</p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 rounded-lg bg-ink px-3 py-2">
            <CheckCircle2 className="size-4 text-[var(--success)]" />
            <span className="text-sm text-[var(--success)]">
              Early access secured
            </span>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 ring-1 ring-inset ring-transparent transition focus-within:ring-ink">
                <User className="size-4 text-[var(--muted-fg)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-[var(--muted-fg)]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
              >
                {buttonLabel}
              </button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
              <Info className="size-3.5" />
              {hint}
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
