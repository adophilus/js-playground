import { ComponentProps, forwardRef } from "react";
import { cn } from "../utils";

export const Section = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, ...props }, ref) =>
  <section {...props} className={cn("w-[960px] mx-auto", className)} ref={ref} />
)
