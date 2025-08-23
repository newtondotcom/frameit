import type React from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { motion, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"motion.div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
  key: number
  isInView: boolean
  cardVariants: Variants
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-4", className)} {...props}>
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  isInView,
  cardVariants,
  ...props
}: BentoCardProps) => (
  <motion.div
    initial="offscreen"
    animate={isInView ? "onscreen" : "offscreen"} // Trigger animation when in view
    variants={cardVariants}
    transition={{ delay: props.key * 0.2 }} // Staggered delay based on index
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden border-4 border-black",
      // Neobrutalist styles
      "bg-card shadow-[8px_8px_0px_0px_theme(colors.black)] transform transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_theme(colors.black)]",
      // dark styles
      "transform-gpu dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]",
      className,
    )}
    {...props}
    role="article"
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon
        className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300"
        aria-hidden="true"
      />
      <h3 className="text-xl font-black uppercase tracking-wider text-card-foreground">{name}</h3>
      <p className="max-w-lg font-bold text-card-foreground">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto focus:ring-2 focus:ring-ring">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </motion.div>
)

export { BentoCard, BentoGrid }

