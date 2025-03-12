"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface NewContentPageProps {
  params: {
    id: string
  }
}

export default function NewContentPage({ params }: NewContentPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    type: z.string({
      required_error: "Please select a content type.",
    }),
    data: z.any(),
    displayFrom: z.date().optional(),
    displayTo: z.date().optional(),
    order: z.number().default(0),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      data: {},
      order: 0,
    },
  })

  const contentType = form.watch("type")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          deviceId: params.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create content")
      }

      toast({
        title: "Content created",
        description: "Your content has been added successfully.",
      })

      router.push(`/dashboard/devices/${params.id}`)
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your content could not be created. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Add Content" text="Add new content to your FrameIt device." />
      <div className="grid gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="message">Message</SelectItem>
                      <SelectItem value="weather">Weather</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The type of content to display on your device.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {contentType === "image" && (
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        onChange={(e) => field.onChange({ url: e.target.value })}
                      />
                    </FormControl>
                    <FormDescription>Enter the URL of the image you want to display.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {contentType === "message" && (
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your message here..."
                        onChange={(e) => field.onChange({ text: e.target.value })}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>Enter the message you want to display.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {contentType === "weather" && (
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New York, NY"
                        onChange={(e) => field.onChange({ location: e.target.value })}
                      />
                    </FormControl>
                    <FormDescription>Enter the location for weather information.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {contentType === "calendar" && (
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calendar URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://calendar.google.com/calendar/ical/..."
                        onChange={(e) => field.onChange({ url: e.target.value })}
                      />
                    </FormControl>
                    <FormDescription>Enter your iCal URL for calendar integration.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="displayFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Display From</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Optional: When to start displaying this content.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Display Until</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Optional: When to stop displaying this content.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>
                    The order in which this content should be displayed (lower numbers first).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Content"}
            </Button>
          </form>
        </Form>
      </div>
    </DashboardShell>
  )
}

