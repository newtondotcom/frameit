import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  marketing: z.boolean().default(false),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, marketing } = waitlistSchema.parse(body)

    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email },
    })

    if (existingEntry) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 })
    }

    await prisma.waitlistEntry.create({
      data: {
        email,
        name,
        marketing,
      },
    })

    return NextResponse.json({ message: "Successfully joined waitlist" }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 400 })
    }

    console.error("Waitlist error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

