import { WaitlistCard } from '../site/waitlist-card'

export function CtaBanner() {
  return (
    <section className="bg-ink">
      <div className="container-page flex justify-center py-12 md:py-16">
        <div className="w-full max-w-xl">
          <WaitlistCard buttonLabel="Join Waitlist" />
        </div>
      </div>
    </section>
  )
}
