import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '#/components/sections/hero'
import { ValueProps } from '#/components/sections/value-props'
import { Sectors } from '#/components/sections/sectors'
import { Experts } from '#/components/sections/experts'
import { AppShowcase } from '#/components/sections/app-showcase'
import { Podcast } from '#/components/sections/podcast'
import { Faq } from '#/components/sections/faq'
import { CtaBanner } from '#/components/sections/cta-banner'

export const Route = createFileRoute('/')({ component: WaitlistPage })

function WaitlistPage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <Sectors />
      <Experts />
      <AppShowcase />
      <Podcast />
      <Faq />
      <CtaBanner />
    </>
  )
}
