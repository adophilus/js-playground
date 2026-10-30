import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { SiteHeader } from '../components/site/site-header'
import { SiteFooter } from '../components/site/site-footer'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Gate84 — Discover Business Opportunities Across Africa',
      },
      {
        name: 'description',
        content:
          'Gate84 is building the infrastructure that powers Africa’s industrial future — bringing investors, consultants, and suppliers together in one trusted ecosystem.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <section className="bg-cream">
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="font-display text-6xl font-medium text-ink">404</p>
        <p className="max-w-md text-[var(--body)]">
          We couldn’t find that page. It may have moved or never existed.
        </p>
        <a
          href="/"
          className="rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90"
        >
          Back to home
        </a>
      </div>
    </section>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
