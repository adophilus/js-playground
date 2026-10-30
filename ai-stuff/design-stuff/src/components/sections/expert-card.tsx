import { BadgeCheck, Star } from 'lucide-react'

export type Expert = {
  name: string
  category: string
  rate: string
  rating: string
  bio: string
  image: string
}

export function ExpertCard({ expert }: { expert: Expert }) {
  const { name, category, rate, rating, bio, image } = expert
  return (
    <article className="flex w-60 shrink-0 flex-col gap-2">
      <div className="relative h-72 overflow-hidden rounded-xl bg-accent">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="size-full object-cover"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">
          {category}
          <BadgeCheck className="size-3.5 text-[var(--success)]" />
        </span>
      </div>

      <div className="flex flex-col gap-1 px-0.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-ink">{name}</span>
            <BadgeCheck className="size-4 text-[var(--success)]" />
          </div>
          <span className="text-sm font-medium text-ink">{rate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="size-4 fill-[var(--star)] text-[var(--star)]" />
          <span className="text-xs text-[var(--body)]">{rating}</span>
        </div>
        <p className="text-sm leading-snug text-[var(--body)]">{bio}</p>
      </div>
    </article>
  )
}
