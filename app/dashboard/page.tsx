import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import Link from "next/link"
import { PlusCircle, Tablet, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const [devices, orders, user] = await Promise.all([
    prisma.device.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.order.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        _count: {
          select: {
            devices: true,
            orders: true,
          },
        },
        createdAt: true,
      },
    }),
  ])

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome back, ${session?.user?.name?.split(" ")[0] || "User"}`}
        text="Manage your FrameIt devices and content."
      >
        <Link href="/dashboard/devices/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6">
        <BentoGrid className="grid-cols-1 md:grid-cols-3">
          <BentoGridItem
            title="My Devices"
            description={`You have ${user?._count?.devices || 0} devices`}
            icon="device"
            className="md:col-span-1"
          >
            <div className="mt-4">
              <Link href="/dashboard/devices">
                <Button variant="outline" className="w-full">
                  View All Devices
                </Button>
              </Link>
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="My Orders"
            description={`You have ${user?._count?.orders || 0} orders`}
            icon="shopping-cart"
            className="md:col-span-1"
          >
            <div className="mt-4">
              <Link href="/dashboard/orders">
                <Button variant="outline" className="w-full">
                  View Order History
                </Button>
              </Link>
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="Account"
            description={`Member since ${memberSince}`}
            icon="user"
            className="md:col-span-1"
          >
            <div className="mt-4">
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full">
                  Manage Account
                </Button>
              </Link>
            </div>
          </BentoGridItem>
        </BentoGrid>

        {devices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Devices</CardTitle>
              <CardDescription>Your recently added FrameIt devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {devices.map((device) => (
                  <Link key={device.id} href={`/dashboard/devices/${device.id}`}>
                    <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted">
                      <Tablet className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {device.size}" {device.displayType === "bw" ? "B&W" : "Color"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {devices.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <Link href="/dashboard/devices">
                    <Button variant="ghost" size="sm">
                      View all devices
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {orders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your recent FrameIt purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <ShoppingCart className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              {orders.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <Link href="/dashboard/orders">
                    <Button variant="ghost" size="sm">
                      View all orders
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  )
}

