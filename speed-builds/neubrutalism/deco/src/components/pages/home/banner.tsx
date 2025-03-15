import { ArrowRightIcon } from "lucide-react";
import { Section } from "../../section";

export const Banner = () => (
  <Section className="py-12">
    <div className="grid grid-cols-12 gap-16">
      <img src="https://placehold.co/400x400" className="border-2 rounded-3xl rounded-br-md [box-shadow:4px_4px_0px_0px_black] col-span-5" />
      <div className="col-span-7 h-full flex flex-col justify-center gap-4">
        <header className="text-4xl font-semibold">We help you to make the best landing pages</header>
        <p className="text-lg">
          Find, explore and learn in a awesome place find, explore and learn in great awesome place find, explore more, explore and learn in an.
        </p>
        <button className="bg-[#2a67d9] [box-shadow:3px_3px_0px_0px_black] text-white flex gap-2 items-center w-[140px] justify-center py-2 rounded-lg border-black border-2 font-medium">
          Get Started
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  </Section>
)
