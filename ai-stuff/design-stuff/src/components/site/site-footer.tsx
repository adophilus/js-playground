import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Apple,
  Facebook,
  Instagram,
  Linkedin,
  Play,
  Twitter,
  Youtube,
} from 'lucide-react'
import { Logo } from './logo'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Gate84', href: '/about' },
      { label: 'Contact Us', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Explore Opportunities', href: '#' },
      { label: 'How It Works', href: '#' },
      { label: 'The Bridge Podcast', href: '#editorial' },
      { label: 'Suppliers', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Editorial', href: '#editorial' },
      { label: 'Guides', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
]

const SOCIALS = [
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
  { label: 'X', icon: Twitter, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
]

function StoreBadge({
  icon,
  top,
  bottom,
}: {
  icon: ReactNode
  top: string
  bottom: string
}) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--line-strong)] bg-white px-4 py-2 transition-colors hover:bg-secondary"
    >
      <span className="text-ink">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] uppercase tracking-wide text-[var(--body)]">
          {top}
        </span>
        <span className="text-xs font-semibold text-ink">{bottom}</span>
      </span>
    </a>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line-soft)] bg-cream">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-[var(--body)]">
              Discover, validate, and execute business opportunities across Africa
              with confidence.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <StoreBadge
                icon={<Apple className="size-5" />}
                top="Download on the"
                bottom="App Store"
              />
              <StoreBadge
                icon={<Play className="size-5" />}
                top="Get it on"
                bottom="Google Play"
              />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-ink">{col.title}</h4>
                {col.links.map((link) =>
                  link.href.startsWith('/') ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-sm text-[var(--body)] transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-[var(--body)] transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ))}

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-ink">Socials</h4>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-lg border border-[var(--line)] bg-white text-[var(--body-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-ink"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--line-soft)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--body)]">
            © {new Date().getFullYear()} Gate84. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted-fg)]">
            Built with TanStack Start · React · shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  )
}
