import Link from "next/link"
import type { Device } from "@prisma/client"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tablet } from "lucide-react"

interface DeviceCardProps {
  device: Device
}

export function DeviceCard({ device }: DeviceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{device.name}</CardTitle>
          <Badge variant={device.isActive ? "default" : "secondary"}>{device.isActive ? "Active" : "Inactive"}</Badge>
        </div>
        <CardDescription>
          {device.size}" {device.displayType === "bw" ? "Black & White" : "Color"} Display
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Tablet className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">S/N: {device.serialNumber}</span>
          </div>
        </div>
        {device.lastSync && (
          <p className="mt-2 text-xs text-muted-foreground">
            Last synced {formatDistanceToNow(new Date(device.lastSync), { addSuffix: true })}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/devices/${device.id}`} className="w-full">
          <Button variant="default" className="w-full">
            Manage Device
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

