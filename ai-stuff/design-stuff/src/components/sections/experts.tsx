import { CalendarCheck, Search, TrendingUp, Video } from 'lucide-react'
import { ExpertCard, type Expert } from './expert-card'

const EXPERTS: Expert[] = [
  {
    name: 'Amara Okafor',
    category: 'Financial Service',
    rate: '$420/session',
    rating: '4.9',
    bio: 'CEO, Fountain Top Consults · Raised over $2B for investors across Africa in 2 years.',
    image: 'https://i.pravatar.cc/480?img=47',
  },
  {
    name: 'David Mensah',
    category: 'Fashion & Lifestyle',
    rate: '$380/session',
    rating: '4.8',
    bio: 'Founder, Loom Africa · Scaled a DTC apparel brand across 9 markets.',
    image: 'https://i.pravatar.cc/480?img=12',
  },
  {
    name: 'Grace Adebayo',
    category: 'Engineering',
    rate: '$500/session',
    rating: '5.0',
    bio: 'Principal Engineer · Delivered infrastructure projects in 4 countries.',
    image: 'https://i.pravatar.cc/480?img=32',
  },
  {
    name: 'Tunde Bello',
    category: 'Healthcare',
    rate: '$440/session',
    rating: '4.9',
    bio: 'Director, CareBridge · Built a chain of clinics serving 200k patients.',
    image: 'https://i.pravatar.cc/480?img=15',
  },
  {
    name: 'Nadia Hassan',
    category: 'Maritime',
    rate: '$460/session',
    rating: '4.7',
    bio: 'Port Operations Lead · Optimized logistics for major West African ports.',
    image: 'https://i.pravatar.cc/480?img=44',
  },
  {
    name: 'Samuel Otieno',
    category: 'Real Estate',
    rate: '$410/session',
    rating: '4.9',
    bio: 'Managing Partner · Closed $120M in land-banking deals.',
    image: 'https://i.pravatar.cc/480?img=33',
  },
  {
    name: 'Fatima Diallo',
    category: 'Manufacturing',
    rate: '$430/session',
    rating: '4.8',
    bio: 'COO, Kora Foods · Scaled a food manufacturing business regionally.',
    image: 'https://i.pravatar.cc/480?img=45',
  },
]

const STEPS = [
  {
    icon: Search,
    title: 'Find an expert',
    body: 'Discover and choose from our list of the world’s most in-demand experts.',
  },
  {
    icon: CalendarCheck,
    title: 'Book a call',
    body: 'Select a time that works for you, or request an RFQ from a supplier.',
  },
  {
    icon: Video,
    title: 'Consult & secure',
    body: 'Hop on a virtual consultation, then close the deal with confidence.',
  },
  {
    icon: TrendingUp,
    title: 'Build with confidence',
    body: 'Make informed decisions with expert support and the right resources.',
  },
]

export function Experts() {
  return (
    <section className="bg-white">
      <div className="container-page py-16 md:py-20">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">
            Problem
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Connect with Verified Business Experts
          </h2>
          <p className="max-w-3xl text-base text-ink">
            Get direct access to experienced consultants, operators, and industry
            specialists who can help you evaluate business opportunities and make
            smarter business decisions.
          </p>
        </div>

        {/* Experts scroller */}
        <div className="no-scrollbar -mx-4 mb-14 flex gap-5 overflow-x-auto px-4 pb-2 md:gap-8">
          {EXPERTS.map((expert) => (
            <ExpertCard key={expert.name} expert={expert} />
          ))}
        </div>

        {/* Process flow */}
        <div className="rounded-2xl border border-[var(--line)] bg-cream/60 p-6 md:p-10">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-wide text-[var(--body)]">
            Consultants
          </p>
          <div className="grid gap-6 md:grid-cols-4 md:gap-2">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="relative flex flex-col items-start">
                <div className="flex w-full items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-white">
                    <Icon className="size-5 text-[var(--body-soft)]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-normal text-[var(--body-soft)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--body)]">
                      {body}
                    </p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-2 top-6 hidden h-px w-4 bg-[var(--line-strong)] md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
