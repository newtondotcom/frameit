"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Content } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Cloud, Image, MessageSquare, MoreHorizontal, Trash } from "lucide-react"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface ContentListProps {
  contents: Content[]
  deviceId: string
}

export function ContentList({ contents, deviceId }: ContentListProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const getContentIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "weather":
        return <Cloud className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      default:
        return null
    }
  }

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case "image":
        return "Image"
      case "message":
        return "Message"
      case "weather":
        return "Weather"
      case "calendar":
        return "Calendar"
      default:
        return type
    }
  }

  const getContentPreview = (content: Content) => {
    const data = content.data as any

    switch (content.type) {
      case "image":
        return data.url ? `${data.url.substring(0, 30)}...` : "No URL"
      case "message":
        return data.text ? `${data.text.substring(0, 30)}...` : "No message"
      case "weather":
        return data.location || "No location"
      case "calendar":
        return data.url ? `${data.url.substring(0, 30)}...` : "No URL"
      default:
        return "No preview available"
    }
  }

  const handleDeleteContent = async (contentId: string) => {
    setIsDeleting(contentId)

    try {
      const response = await fetch(`/api/content/${contentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete content")
      }

      toast({
        title: "Content deleted",
        description: "Your content has been deleted successfully.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to delete content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
        <CardDescription>Manage the content displayed on your device.</CardDescription>
      </CardHeader>
      <CardContent>
        {contents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getContentIcon(content.type)}
                      <span>{getContentTypeLabel(content.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{getContentPreview(content)}</TableCell>
                  <TableCell>{content.order}</TableCell>
                  <TableCell>
                    {content.isActive ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-gray-500">Inactive</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteContent(content.id)}
                          disabled={isDeleting === content.id}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          {isDeleting === content.id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="file" />
            <EmptyPlaceholder.Title>No content added</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any content yet. Add some to display on your device.
            </EmptyPlaceholder.Description>
            <Link href={`/dashboard/devices/${deviceId}/content/new`}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </Link>
          </EmptyPlaceholder>
        )}
      </CardContent>
    </Card>
  )
}

