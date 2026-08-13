import type { ComponentProps } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '#/lib/utils'

type Variant = 'solid' | 'outline' | 'light'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-white hover:bg-ink/90 border border-[var(--line)]',
  outline:
    'border border-ink bg-transparent text-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink border border-[var(--line)] hover:bg-white/90',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function PrimaryButton({
  className,
  variant = 'solid',
  size = 'md',
  withArrow = true,
  children,
  ...props
}: ComponentProps<'button'> & {
  variant?: Variant
  size?: Size
  withArrow?: boolean
}) {
  return (
    <button
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </button>
  )
}
