import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { deviceId, type, data, displayFrom, displayTo, order } = body

    if (!deviceId || !type || !data) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if device belongs to user
    const device = await prisma.device.findUnique({
      where: {
        id: deviceId,
        userId: session.user.id,
      },
    })

    if (!device) {
      return NextResponse.json({ message: "Device not found or not owned by user" }, { status: 404 })
    }

    const content = await prisma.content.create({
      data: {
        type,
        data,
        deviceId,
        displayFrom: displayFrom ? new Date(displayFrom) : undefined,
        displayTo: displayTo ? new Date(displayTo) : undefined,
        order: order || 0,
      },
    })

    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

