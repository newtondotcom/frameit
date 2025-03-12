import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const device = await prisma.device.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
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
      return NextResponse.json({ message: "Device not found" }, { status: 404 })
    }

    return NextResponse.json(device)
  } catch (error) {
    console.error("Error fetching device:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, isActive } = body

    // Check if device exists and belongs to user
    const existingDevice = await prisma.device.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingDevice) {
      return NextResponse.json({ message: "Device not found" }, { status: 404 })
    }

    const updatedDevice = await prisma.device.update({
      where: {
        id: params.id,
      },
      data: {
        name: name !== undefined ? name : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    })

    return NextResponse.json(updatedDevice)
  } catch (error) {
    console.error("Error updating device:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if device exists and belongs to user
    const existingDevice = await prisma.device.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingDevice) {
      return NextResponse.json({ message: "Device not found" }, { status: 404 })
    }

    // Delete device and all related content
    await prisma.device.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Device deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting device:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

