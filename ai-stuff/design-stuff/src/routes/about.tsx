import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <section className="bg-cream">
      <div className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex w-fit items-center rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">
            About Gate84
          </span>
          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Building the infrastructure for Africa’s industrial future
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
            Gate84 brings investors, consultants, and suppliers together in one
            trusted ecosystem — making it easier to discover opportunities,
            connect with the right partners, and execute with confidence.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              Back to home
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            ['1 ecosystem', 'Investors, experts & suppliers in one place'],
            ['15+ sectors', 'Researched opportunities across high-growth industries'],
            ['Verified', 'Experts and suppliers you can trust'],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-2xl border border-[var(--line)] bg-white p-6 text-center"
            >
              <p className="font-display text-2xl font-medium text-ink">
                {title}
              </p>
              <p className="mt-2 text-sm text-[var(--body)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
