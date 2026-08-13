import { Play, Youtube } from 'lucide-react'

export function Podcast() {
  return (
    <section id="editorial" className="bg-white">
      <div className="container-page py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left copy */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-[var(--body)]">
              Podcast
            </span>
            <div>
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Inside The Buck$
              </h2>
              <p className="mt-1 text-xs text-ink">Powered by Gate84</p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--body-soft)]">
              The conversations behind the opportunities. Insights from
              investors, founders, consultants, and industry leaders building the
              future of business across Africa.
            </p>
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-soft)] bg-secondary px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-[var(--line)]"
              >
                <Youtube className="size-4 text-[#ff0000]" />
                Watch
              </a>
            </div>
          </div>

          {/* Right thumbnail */}
          <a
            href="#"
            className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-ink"
          >
            <img
              src="https://picsum.photos/seed/gate84-podcast/960/600"
              alt="Inside The Buck$ podcast"
              loading="lazy"
              className="size-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 size-6 fill-ink text-ink" />
              </span>
            </div>
            <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
              Latest episode
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
