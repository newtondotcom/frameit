import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DeviceCard } from "@/components/device-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default async function DevicesPage() {
  const session = await getServerSession(authOptions)

  const devices = await prisma.device.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="My Devices" text="Manage your FrameIt devices.">
        <Link href="/dashboard/devices/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </Link>
      </DashboardHeader>

      {devices.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="device" />
          <EmptyPlaceholder.Title>No devices added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any devices yet. Add one to get started.
          </EmptyPlaceholder.Description>
          <Link href="/dashboard/devices/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </Link>
        </EmptyPlaceholder>
      )}
    </DashboardShell>
  )
}

