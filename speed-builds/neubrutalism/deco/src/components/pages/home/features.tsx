import { FolderIcon, HeartIcon, SendIcon } from "lucide-react"
import { Section } from "../../section"

const features = [
  {
    icon: SendIcon,
    color: "#f0b12b",
    title: "Speed tutorial",
    body: "You have access to all of free speed deal courses and you can have access to all of free speed deal courses."
  },
  {
    icon: FolderIcon,
    color: "#f44b87",
    title: "Document center",
    body: "have access to all of free speed deal courses and you can have access to all of free speed deal courses"
  },
  {
    icon: HeartIcon,
    color: "#4084e8",
    title: "Lovely place",
    body: "have access to all of free speed deal courses and you can have access to all of free speed deal courses"
  }
]

export const Features = () => (
  <Section className="py-12">
    <div className="grid grid-cols-3 gap-4">
      {features.map(feature => (
        <div className="border-2 rounded-md [box-shadow:2px_4px_0px_0px_black] p-6 flex flex-col gap-4">
          <div className="flex">
            <div style={{ backgroundColor: feature.color }} className="p-3 rounded-md [box-shadow:2px_3px_0px_0px_black] border-black border-2">
              <feature.icon className="size-6 stroke-white" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <header className="font-semibold text-lg">{feature.title}</header>
            <p className="text-sm font-light text-gray-500">
              {feature.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Section>
)
