import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { apiKey: string } }) {
  try {
    // Find device by API key
    const device = await prisma.device.findUnique({
      where: {
        apiKey: params.apiKey,
        isActive: true,
      },
      include: {
        contents: {
          where: {
            isActive: true,
            OR: [
              {
                displayFrom: null,
                displayTo: null,
              },
              {
                displayFrom: {
                  lte: new Date(),
                },
                displayTo: {
                  gte: new Date(),
                },
              },
              {
                displayFrom: {
                  lte: new Date(),
                },
                displayTo: null,
              },
              {
                displayFrom: null,
                displayTo: {
                  gte: new Date(),
                },
              },
            ],
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    if (!device) {
      return NextResponse.json({ message: "Device not found or inactive" }, { status: 404 })
    }

    // Update last sync time
    await prisma.device.update({
      where: {
        id: device.id,
      },
      data: {
        lastSync: new Date(),
      },
    })

    // Return only necessary data for the device
    return NextResponse.json({
      id: device.id,
      name: device.name,
      size: device.size,
      displayType: device.displayType,
      contents: device.contents.map((content) => ({
        id: content.id,
        type: content.type,
        data: content.data,
        order: content.order,
      })),
    })
  } catch (error) {
    console.error("Error in device sync:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

