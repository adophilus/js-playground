import { WaitlistCard } from '../site/waitlist-card'
import { PrimaryButton } from '../site/primary-button'

const HERO_IMAGES = [
  'https://picsum.photos/seed/gate84-africa-1/640/780',
  'https://picsum.photos/seed/gate84-africa-2/640/780',
  'https://picsum.photos/seed/gate84-africa-3/640/780',
  'https://picsum.photos/seed/gate84-africa-4/640/780',
]

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container-page py-12 md:py-16">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* Left content panel */}
          <div className="flex flex-col gap-8 rounded-2xl bg-cream p-7 md:p-10 lg:p-12">
            <div className="flex flex-col gap-5">
              <h1 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Discover Business Opportunities Across Africa
              </h1>
              <div className="max-w-xl space-y-4 text-base text-[var(--body)] md:text-lg">
                <p>
                  Every successful business starts with the right information,
                  the right people, and the right resources. Gate84 is building
                  the infrastructure that powers Africa’s industrial future by
                  bringing investors, consultants, and suppliers together in one
                  trusted ecosystem.
                </p>
                <p>
                  Connecting Africa’s business ecosystem so investors,
                  consultants, and suppliers can discover business opportunities
                  and grow together.
                </p>
              </div>
              <div>
                <PrimaryButton size="md">Discover Investments</PrimaryButton>
              </div>
            </div>

            <WaitlistCard className="max-w-xl" />
          </div>

          {/* Right image column */}
          <div className="relative hidden min-h-[520px] overflow-hidden rounded-2xl bg-ink lg:block">
            <div className="absolute inset-0 animate-scroll-y">
              <div className="flex flex-col">
                {[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
                  <div key={i} className="relative h-[260px] shrink-0">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
