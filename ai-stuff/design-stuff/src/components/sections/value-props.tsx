const ITEMS = [
  {
    title: 'Discover Verified Opportunities',
    body: 'Explore curated business and investment opportunities across high-growth sectors including manufacturing, agriculture, technology, infrastructure, renewable energy, healthcare, and logistics.',
  },
  {
    title: 'Connect With The Right Partners',
    body: 'Work with verified consultants, suppliers, manufacturers, and service providers who help move projects from planning to execution.',
  },
  {
    title: 'Execute With Confidence',
    body: 'Manage collaborations, consultations, payments, and business relationships within one trusted platform designed to reduce risk and improve outcomes.',
  },
]

export function ValueProps() {
  return (
    <section className="bg-white">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-0">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-2 md:px-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[var(--line-soft)]"
            >
              <h3 className="text-sm font-medium text-ink">{item.title}</h3>
              <p className="text-sm font-light leading-relaxed text-[var(--body-soft)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
