import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrderList } from "@/components/order-list"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="My Orders" text="View and manage your FrameIt orders." />

      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="shopping-cart" />
          <EmptyPlaceholder.Title>No orders yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t placed any orders yet. Start by ordering your first FrameIt device.
          </EmptyPlaceholder.Description>
          <Link href="/preorder">
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Shop Now
            </Button>
          </Link>
        </EmptyPlaceholder>
      )}
    </DashboardShell>
  )
}

