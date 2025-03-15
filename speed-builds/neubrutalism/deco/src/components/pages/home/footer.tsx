import { ArrowRightIcon } from "lucide-react"
import { Section } from "../../section"
import { LogoIcon } from "../../icons"

const items = [
  {
    title: "About", items: [{ label: "About" }, { label: "Projects" }]
  },
  {
    title: "What we Do", items: [{ label: "What We Do" }, { label: "Templates" }]
  },
  {
    title: "Jobs", items: [{ label: "Jobs" }, { label: "Download" }]
  }
]

export const Footer = () => (
  <div className="border-t-2 bg-gray-100">
    <Section className="py-12">
      <div className="divide-y divide-gray-300">
        <div className="grid grid-cols-5 gap-8 pb-6">
          <div className="flex flex-col gap-2">
            <LogoIcon className="w-[100px] h-auto" />
            <p className="text-xs">👑 Enjoy designing with us</p>
          </div>
          {items.map(item =>
            <div className="flex flex-col gap-3">
              <header className="uppercase font-semibold text-gray-500 text-xs">
                {item.title}
              </header>
              <div className="text-sm">
                {item.items.map(_item => <div>{_item.label}</div>)}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <header className="uppercase font-semibold text-gray-500 text-xs">
              Join our community
            </header>
            <div>
              <div className="text-sm flex px-3 border-2 rounded-full [box-shadow:1px_2px_0px_0px_black] py-1">
                <input type="text" placeholder="Enter your email" className="shrink" />
                <div className="shrink-0 bg-[#2a67d9] text-white p-1 rounded-full [box-shadow:1px_2px_0px_0px_black]">
                  <ArrowRightIcon className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 text-gray-400 text-center text-xs">
          Copyright © 2023. All rights reserved
        </div>
      </div>
    </Section>
  </div>
)
