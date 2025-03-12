import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { data, displayFrom, displayTo, isActive, order } = body

    // Check if content exists and belongs to user's device
    const existingContent = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
      include: {
        device: true,
      },
    })

    if (!existingContent || existingContent.device.userId !== session.user.id) {
      return NextResponse.json({ message: "Content not found or not owned by user" }, { status: 404 })
    }

    const updatedContent = await prisma.content.update({
      where: {
        id: params.id,
      },
      data: {
        data: data !== undefined ? data : undefined,
        displayFrom: displayFrom ? new Date(displayFrom) : undefined,
        displayTo: displayTo ? new Date(displayTo) : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        order: order !== undefined ? order : undefined,
      },
    })

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if content exists and belongs to user's device
    const existingContent = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
      include: {
        device: true,
      },
    })

    if (!existingContent || existingContent.device.userId !== session.user.id) {
      return NextResponse.json({ message: "Content not found or not owned by user" }, { status: 404 })
    }

    await prisma.content.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Content deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

