import { ArrowRightIcon, ChevronDownIcon, CloudIcon, SendIcon } from "lucide-react";
import { Section } from "../../section";
import { FunctionComponent, ReactNode } from "react";

const HeroImage = () => (
  <div className="relative">
    <img src="https://placehold.co/400x600" className="border-2 rounded-3xl rounded-br-md [box-shadow:4px_4px_0px_0px_black]" />
    <div className="absolute bottom-0 pb-12 -translate-x-1/2 flex flex-col gap-8">
      <div className="border-2 rounded-2xl rounded-tr-sm p-4 w-[200px] flex flex-col gap-2 [box-shadow:2px_2px_0px_0px_black] bg-white -rotate-5">
        <header className="flex items-center gap-2">
          <span className="text-white bg-[#2a67d9] rounded-lg size-6 flex items-center justify-center border border-black [box-shadow:2px_2px_0px_0px_black]">
            <SendIcon className="size-3 fill-white" />
          </span>
          <span className="text-[#2a67d9] font-semibold">Quickly design</span>
        </header>
        <p className="text-sm font-medium">
          We feeling good with out incredible system speed in making landing pages.
        </p>
      </div>
      <div className="border-2 rounded-2xl rounded-br-sm p-4 w-[200px] flex flex-col gap-2 [box-shadow:2px_2px_0px_0px_black] bg-white rotate-5 translate-x-1/4">
        <header className="flex items-center gap-2">
          <span className="text-white bg-emerald-500 rounded-lg size-6 flex items-center justify-center border border-black [box-shadow:2px_2px_0px_0px_black]">
            <CloudIcon className="size-3 fill-white" />
          </span>
          <span className="text-[#2a67d9] font-semibold">Safe cloud</span>
        </header>
        <p className="text-sm font-medium">
          All of your artboards will be save in a safe cloud to have a better present.
        </p>
      </div>
    </div>
  </div>
)

const WeeklyChallenges = () => (
  <div className="border-2 border-black rounded-lg p-4 px-8 [box-shadow:4px_4px_0px_0px_black]">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <header className="text-xl font-semibold text-center">
          Our weekly challenges
        </header>
        <p className="text-xs text-center">
          Every week we implement a big challenges for our designers to know our design community.
        </p>
      </div>
      <img src="https://placehold.co/600x400" className="rounded-3xl border-2 [box-shadow:1px_3px_0px_0px_black]" />
    </div>
  </div>
)

const points = [
  {
    header: "First download Deco application",
    body: "With Deco all of ui designers and even programmers can make big and small landing pages and publish them"
  },
  {
    header: "Install Deco application and open it",
    body: "With Deco all of ui designers and even programmers small landings and publish them all of ui designers and even programmers"
  },
  {
    header: "Sign in and choose your favourite template.",
    body: "With Deco all of ui designers and even programmers can make big and small landing pages and publish them"
  }
]

const Points = () => (
  <div className="flex flex-col gap-4">
    {points.map((point, index) =>
      <div className="flex gap-6">
        <div className="size-12 border-2 rounded-full flex items-center justify-center [box-shadow:1px_3px_0px_0px_black] shrink-0">
          {index + 1}
        </div>
        <div className="shrink flex flex-col gap-1">
          <header className="font-semibold">{point.header}</header>
          <p className="text-sm">
            {point.body}
          </p>
        </div>
      </div>
    )}
  </div>
)

const Highlight: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <span className="bg-[#2a67d9] text-white p-1 inline-block [box-shadow:6px_6px_0px_0px_black]">{children}</span>
)
export const Hero = () => (
  <Section className="py-12">
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-6">
        <div className="flex flex-col gap-12 mt-12">
          <div className="flex flex-col gap-4">
            <header className="text-6xl font-semibold">
              Here <Highlight>designers</Highlight> make awesome landing pages
            </header>
            <p className="text-xl w-3/4">
              With Deco all of ui designers and even programers can make big and small landing pages and publish them.
            </p>
            <div className="flex gap-3 items-center">
              <button className="bg-[#2a67d9] [box-shadow:3px_3px_0px_0px_black] text-white flex gap-2 items-center w-[140px] justify-center py-2 rounded-lg border-black border-2 font-medium">
                Get Started
                <ArrowRightIcon className="size-4" />
              </button>
              <button className="[box-shadow:3px_3px_0px_0px_black] flex gap-1 items-center w-[140px] justify-center py-2 rounded-lg border-black border-2 font-medium">
                Download
                <ChevronDownIcon className="size-4 stroke-3" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 bg-emerald-400 inline-block rounded-full" />
              <span className="text-sm text-gray-400 underline font-light">Have any questions?</span>
            </div>
          </div>
          <div className="w-3/4">
            <WeeklyChallenges />
          </div>
        </div>
      </div>
      <div className="col-span-6 flex flex-col gap-12">
        <HeroImage />
        <Points />
      </div>
    </div>
  </Section>
)
