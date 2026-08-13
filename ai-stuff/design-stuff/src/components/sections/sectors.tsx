import {
  Anchor,
  Banknote,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  PackageCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sprout,
  Sun,
  Tablet,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

const SECTORS: { label: string; icon: LucideIcon; tint: string }[] = [
  { label: 'Manufacturing', icon: Factory, tint: '#eef2f7' },
  { label: 'Logistics', icon: Truck, tint: '#eef7f4' },
  { label: 'Retail', icon: ShoppingBag, tint: '#f7f1ef' },
  { label: 'Agriculture', icon: Sprout, tint: '#eef7ef' },
  { label: 'Marine', icon: Anchor, tint: '#eef3f7' },
  { label: 'Education', icon: GraduationCap, tint: '#f4eef7' },
  { label: 'Renewable Energy', icon: Sun, tint: '#fbf6e8' },
  { label: 'Technology', icon: Cpu, tint: '#eef2f7' },
  { label: 'Real Estate', icon: Building2, tint: '#eef7ef' },
  { label: 'Import & Export', icon: PackageCheck, tint: '#eef7f4' },
  { label: 'Financial Services', icon: Banknote, tint: '#f7f1ef' },
  { label: 'Beauty & Cosmetics', icon: Sparkles, tint: '#f7eef4' },
  { label: 'Food & Beverage', icon: UtensilsCrossed, tint: '#fbf6e8' },
  { label: 'Fashion & Lifestyle', icon: Shirt, tint: '#f4eef7' },
]

export function Sectors() {
  return (
    <section className="bg-cream">
      <div className="container-page py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
            Sectors we cover
          </h2>
          <p className="hidden max-w-sm text-sm text-[var(--body)] sm:block">
            High-growth industries across the continent, researched and ready to
            explore.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {SECTORS.map(({ label, icon: Icon, tint }) => (
            <div key={label} className="group flex flex-col gap-2">
              <div
                className="flex aspect-[4/3] items-center justify-center rounded-xl border border-[var(--line)] transition-colors duration-200 group-hover:border-[var(--line-strong)]"
                style={{ backgroundColor: tint }}
              >
                <Icon
                  className="size-7 text-[var(--body-soft)]"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-xs font-normal text-ink">{label}</span>
            </div>
          ))}
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-[var(--line-strong)] bg-transparent lg:col-span-1">
            <span className="flex items-center gap-1 text-xs font-medium text-[var(--muted-fg)]">
              <Tablet className="size-3.5" /> + more
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
