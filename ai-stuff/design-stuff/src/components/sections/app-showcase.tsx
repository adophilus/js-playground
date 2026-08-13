import { TrendingUp } from 'lucide-react'
import { WaitlistCard } from '../site/waitlist-card'

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px]">
      {/* phone frame */}
      <div className="relative rounded-[2.4rem] border border-ink/10 bg-ink p-2 shadow-2xl">
        <div className="overflow-hidden rounded-[2rem] bg-ink">
          {/* notch */}
          <div className="relative flex h-6 items-center justify-center">
            <div className="absolute top-1.5 h-1.5 w-20 rounded-full bg-white/15" />
          </div>

          {/* app screen */}
          <div className="flex flex-col gap-2 px-2 pb-3">
            {/* header row */}
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="text-xs font-semibold text-white">Feed</span>
              <span className="text-[10px] text-white/40">Swipe to refresh</span>
            </div>

            {/* feed cards */}
            {[
              {
                tag: 'Mining',
                title: "Tapping Safely Into Nigeria's Global Battery Mineral Rush",
                meta: '3 hrs ago',
                range: '$10K–$50K',
              },
              {
                tag: 'AgriTech',
                title: 'Rumuokoro LandBanking Investment',
                meta: '1 day ago',
                range: '$25K–$120K',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-lg bg-[#161616] p-2.5 ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium text-white">
                    {c.tag}
                  </span>
                  <span className="text-[9px] text-white/40">{c.meta}</span>
                </div>
                <p className="mt-1.5 text-[11px] font-medium leading-snug text-white">
                  {c.title}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <TrendingUp className="size-3 text-[var(--success)]" />
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/70">
                    {c.range}
                  </span>
                </div>
              </div>
            ))}

            {/* bottom nav */}
            <div className="mt-1 flex items-center justify-around rounded-lg bg-[#161616] px-2 py-2">
              {['Home', 'Search', 'Saved', 'Profile'].map((n, i) => (
                <span
                  key={n}
                  className={
                    i === 0
                      ? 'text-[9px] font-medium text-white'
                      : 'text-[9px] text-white/30'
                  }
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AppShowcase() {
  return (
    <section className="bg-white">
      <div className="container-page py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm text-ink">
              🚀 Launching soon
            </span>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Your whole investment experience in one simple mobile app
            </h2>
            <p className="max-w-xl text-base text-[var(--body)] md:text-lg">
              From discovering opportunities to sourcing suppliers, booking expert
              consultations, and managing projects, Gate84 gives you the tools to
              build businesses that contribute to Africa’s industrial
              transformation.
            </p>
            <WaitlistCard className="max-w-md" />
          </div>

          <div>
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
