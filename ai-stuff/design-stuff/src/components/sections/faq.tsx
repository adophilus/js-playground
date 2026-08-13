import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { MessageCircleQuestion } from 'lucide-react'

const FAQS = [
  {
    q: 'What is Gate84?',
    a: 'Gate84 is a business discovery and intelligence platform that connects investors with business opportunities across Africa. We combine AI-powered research with trusted experts and suppliers so you can move from idea to execution with clarity and confidence.',
  },
  {
    q: 'Who is Gate84 for?',
    a: 'Gate84 is built for entrepreneurs, business owners, investors, consultants, suppliers, and anyone serious about building or backing businesses across African markets.',
  },
  {
    q: 'What industries does Gate84 cover?',
    a: 'Gate84 covers opportunities across sectors including agriculture, manufacturing, logistics, renewable energy, technology, real estate, financial services, and more.',
  },
  {
    q: 'Can I connect with experts?',
    a: 'Yes. Users can connect with experienced consultants and industry specialists for guidance, evaluations, and hands-on support.',
  },
  {
    q: 'Are suppliers verified?',
    a: 'Yes. Suppliers on Gate84 go through a verification process before being listed on the platform.',
  },
  {
    q: 'Is Gate84 available outside Africa?',
    a: 'Yes. Gate84 is designed for both local entrepreneurs and the global African diaspora looking to invest or build on the continent.',
  },
]

const FEATURES = [
  {
    title: 'Discover Opportunities',
    body: 'Explore carefully researched business opportunities across agriculture, logistics, manufacturing, energy, technology, and more.',
  },
  {
    title: 'Ask Questions. Get Clear Answers',
    body: 'Ask questions directly inside any opportunity and get grounded answers backed by research.',
  },
  {
    title: 'Everything connected in one experience',
    body: 'Research, experts, suppliers, and execution tools — all connected in a single trusted workflow.',
  },
]

export function Faq() {
  return (
    <section className="bg-cream">
      <div className="container-page py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Investors Ask Us These Questions
          </h2>
          <p className="max-w-3xl text-base text-ink">
            Everything you need to evaluate opportunities, work with experts, and
            build with confidence.
          </p>
          <p className="font-display text-xl text-[var(--body-soft)] md:text-2xl">
            Read detailed business breakdowns.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="flex flex-col gap-3"
            >
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="rounded-xl border border-[var(--line-soft)] bg-white px-5 last:border-b"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-ink hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-[var(--body)]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-6 flex items-center gap-2 text-sm text-[var(--body)]">
              <MessageCircleQuestion className="size-4" />
              Can’t find the answer you’re looking for? Drop us a line at{' '}
              <a
                href="mailto:hello@gate84.io"
                className="font-medium text-ink underline underline-offset-2"
              >
                hello@gate84.io
              </a>
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[var(--line)] bg-white p-6"
              >
                <h3 className="font-display text-xl font-medium text-[var(--body-soft)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--body)]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
