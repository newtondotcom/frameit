"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Device } from "@prisma/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDistanceToNow } from "date-fns"

interface DeviceInfoProps {
  device: Device
}

export function DeviceInfo({ device }: DeviceInfoProps) {
  const router = useRouter()
  const [isActive, setIsActive] = useState(device.isActive)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleStatusChange = async () => {
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/devices/${device.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !isActive,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update device status")
      }

      setIsActive(!isActive)
      toast({
        title: "Device updated",
        description: `Device is now ${!isActive ? "active" : "inactive"}.`,
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to update device status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteDevice = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/devices/${device.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete device")
      }

      toast({
        title: "Device deleted",
        description: "Your device has been deleted successfully.",
      })

      router.push("/dashboard/devices")
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to delete device. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Information</CardTitle>
        <CardDescription>Details and settings for your FrameIt device.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Serial Number</p>
            <p className="text-sm text-muted-foreground">{device.serialNumber}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Size</p>
            <p className="text-sm text-muted-foreground">{device.size}" Display</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Display Type</p>
            <p className="text-sm text-muted-foreground">{device.displayType === "bw" ? "Black & White" : "Color"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Added On</p>
            <p className="text-sm text-muted-foreground">{new Date(device.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {device.lastSync && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Last Synced</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(device.lastSync), { addSuffix: true })}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch id="device-active" checked={isActive} onCheckedChange={handleStatusChange} disabled={isUpdating} />
          <Label htmlFor="device-active">Device Active</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={isUpdating}>
          Regenerate API Key
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Device</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your device and all associated content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteDevice}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground"
              >
                {isDeleting ? "Deleting..." : "Delete Device"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

