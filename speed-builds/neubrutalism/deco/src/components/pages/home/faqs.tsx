import { ChevronDownIcon } from "lucide-react"
import { FunctionComponent } from "react"
import { Section } from "../../section"
import { cn } from "../../../utils"

const questions = [
  {
    title: "How Deco works?",
    body: "The stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit, Stacks: eCommerce Kit, Stacks is a production-ready library of stockable content blocks buillllt in React Native, Mix-and-match dozens of responsive elements to quickly configure."
  },
  {
    title: "Whats our business plan?",
    body: "The stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit, Stacks: eCommerce Kit, Stacks is a production-ready library of stockable content blocks buillllt in React Native, Mix-and-match dozens of responsive elements to quickly configure."
  },
  {
    title: "Which platforms are we supporting?",
    body: "The stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit, Stacks: eCommerce Kit, Stacks is a production-ready library of stockable content blocks buillllt in React Native, Mix-and-match dozens of responsive elements to quickly configure."
  }
]

type FaqType = {
  title: string
  questions: { title: string, body: string }[]
}

const faqs: FaqType[] = [
  {
    title: "General",
    questions
  },
  {
    title: "Design",
    questions
  },
  {
    title: "Templates",
    questions
  },
  {
    title: "Account",
    questions
  }
]

const FaqQuestions: FunctionComponent<{ faq: FaqType }> = ({ faq }) => faq.questions.map((question, index) =>
  <div className="divide-y divide-gray-200">
    <div className="flex gap-8 py-4 items-center">
      <div className="font-semibold">
        0{index + 1}
      </div>
      <div className="grow">{question.title}</div>
      <div><ChevronDownIcon className="size-4" /></div>
    </div>
    <div className="h-0 overflow-hidden">{question.body}</div>
  </div>
)

export const Faqs = () => (
  <Section className="py-12">
    <div className="[box-shadow:4px_4px_0px_0px_black] border-2 rounded-xl px-20 py-12">
      <div className="flex flex-col gap-8">
        <header className="text-4xl text-center font-semibold">Frequently asked questions</header>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-center">
            {faqs.map((faq, index) => <div className={cn("rounded-full px-2 py-1", index === 0 && "border-2 [box-shadow:2px_2px_0px_0px_black]")}>{faq.title}</div>)}
          </div>
          <div>
            <FaqQuestions faq={faqs[0]} />
          </div>
        </div>
      </div>
    </div>
  </Section>
)
