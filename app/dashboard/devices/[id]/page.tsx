import { notFound } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DeviceInfo } from "@/components/device-info"
import { ContentList } from "@/components/content-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface DevicePageProps {
  params: {
    id: string
  }
}

export default async function DevicePage({ params }: DevicePageProps) {
  const session = await getServerSession(authOptions)

  const device = await prisma.device.findUnique({
    where: {
      id: params.id,
      userId: session?.user.id,
    },
    include: {
      contents: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })

  if (!device) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={device.name} text="Manage your device and its content.">
        <Link href={`/dashboard/devices/${device.id}/content/new`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-8">
        <DeviceInfo device={device} />
        <ContentList contents={device.contents} deviceId={device.id} />
      </div>
    </DashboardShell>
  )
}

