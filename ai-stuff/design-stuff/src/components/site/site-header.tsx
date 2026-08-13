import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { PrimaryButton } from './primary-button'
import { cn } from '#/lib/utils'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-5">
          <Link to="/" aria-label="Gate84 home" className="shrink-0">
            <Logo />
          </Link>

          <span className="hidden h-5 w-px bg-[var(--line-soft)] md:block" />

          <a
            href="#editorial"
            className="hidden text-xs font-normal text-[var(--body)] transition-colors hover:text-ink md:inline-block"
          >
            Editorial
          </a>

          <span className="hidden h-5 w-px bg-[var(--line-soft)] md:block" />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-1.5 text-sm font-normal text-[var(--body)] transition-colors hover:text-ink"
                activeProps={{ className: 'text-ink font-medium' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <PrimaryButton variant="outline" size="sm" withArrow={false}>
            Join our Network
          </PrimaryButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--line)] text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-[var(--line)] bg-white transition-[max-height] duration-300 md:hidden',
          open ? 'max-h-80' : 'max-h-0',
        )}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#editorial"
            onClick={() => setOpen(false)}
            className="rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent"
          >
            Editorial
          </a>
          <div className="mt-2">
            <PrimaryButton
              variant="solid"
              size="md"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Join our Network
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  )
}
