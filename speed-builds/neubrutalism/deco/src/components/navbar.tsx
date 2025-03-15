import { ChevronDownIcon, GlobeIcon } from 'lucide-react'
import { Section } from './section'
import { LogoIcon } from './icons'

const items = [
  { label: "Stock" }, { label: "About" }, { label: "Support" }, { label: "Forum" }, { label: "Jobs" }, { label: "Language", icon: <GlobeIcon className="size-4" /> }
]

export const Navbar = () => (
  <Section>
    <nav className="flex justify-between items-center py-4">
      <div>
        <LogoIcon className="w-20 h-auto" />
      </div>
      <div className="flex items-center gap-6">
        {items.map(item => (
          <div className="flex items-center gap-1">
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        <button className="[box-shadow:3px_3px_0px_0px_#2a67d9] rounded-full border-2 border-[#2a67d9] px-4 py-2 text-[#2a67d9] font-semibold">
          Get started
        </button>
        <button className="flex gap-1 items-center [box-shadow:3px_3px_0px_0px_black] rounded-full border-2 border-black px-4 py-2">
          Download
          <ChevronDownIcon className="size-4 stroke-3" />
        </button>
      </div>
    </nav>
  </Section>
)
