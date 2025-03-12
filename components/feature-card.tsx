import { Image, MessageSquare, Users, Calendar, Laptop, Shield, type LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
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
      default:
        return Image
    }
  }

  const IconComponent = getIcon()

  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border p-4 transition-all hover:bg-muted/50">
      <div className="rounded-full bg-primary/10 p-3">
        <IconComponent className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  )
}

