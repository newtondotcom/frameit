import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const devices = await prisma.device.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(devices)
  } catch (error) {
    console.error("Error fetching devices:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, size, displayType } = body

    if (!name || !size || !displayType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Generate a random serial number
    const serialNumber = `FI-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

    const device = await prisma.device.create({
      data: {
        name,
        size,
        displayType,
        serialNumber,
        userId: session.user.id,
      },
    })

    return NextResponse.json(device, { status: 201 })
  } catch (error) {
    console.error("Error creating device:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

