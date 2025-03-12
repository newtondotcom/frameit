"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import {
  Image,
  MessageSquare,
  Users,
  Calendar,
  Laptop,
  Shield,
  type LucideIcon,
  ShoppingCart,
  Tablet,
  User,
} from "lucide-react"

interface BentoGridProps {
  className?: string
  children?: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>{children}</div>
}

interface BentoGridItemProps {
  title: string
  description: string
  icon: string
  className?: string
  children?: React.ReactNode
}

export function BentoGridItem({ title, description, icon, className, children }: BentoGridItemProps) {
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "image":
        return Image
      case "message-square":
        return MessageSquare
      case "users":
        return Users
      case "calendar":
        return Calendar
      case "laptop":
        return Laptop
      case "shield":
        return Shield
      case "shopping-cart":
        return ShoppingCart
      case "device":
        return Tablet
      case "user":
        return User
      default:
        return Image
    }
  }

  const IconComponent = getIcon()

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 border border-transparent hover:border-neutral-200 dark:hover:border-white/[0.2] bg-white dark:bg-black/[0.2] flex flex-col justify-between space-y-4",
        className,
      )}
    >
      <div>
        <div className="rounded-full bg-primary/10 p-3 w-fit">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

