"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PreorderPage() {
  const [size, setSize] = useState("5inch")
  const [color, setColor] = useState("bw")

  const handlePreorder = () => {
    // In a real implementation, this would open Lemon Squeezy checkout
    // For now, we'll just log the selected options
    console.log("Preordering:", { size, color })

    // Example of how to integrate with Lemon Squeezy
    // window.createLemonSqueezy();
    // window.LemonSqueezy.Url.Open('https://your-store.lemonsqueezy.com/checkout/buy/product-id');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Preorder Your FrameIt</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Be among the first to experience the future of digital frames
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-2xl mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Configure Your FrameIt</CardTitle>
                <CardDescription>Choose your preferred size and display type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-medium">Select Size</h3>
                  <RadioGroup value={size} onValueChange={setSize} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="3.5inch" id="size-small" className="peer sr-only" />
                      <Label
                        htmlFor="size-small"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xl font-bold">3.5"</span>
                        <span className="text-sm font-medium">Compact</span>
                        <span className="mt-2 text-primary font-bold">$79</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="5inch" id="size-medium" className="peer sr-only" />
                      <Label
                        htmlFor="size-medium"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xl font-bold">5"</span>
                        <span className="text-sm font-medium">Medium</span>
                        <span className="mt-2 text-primary font-bold">$99</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="7inch" id="size-large" className="peer sr-only" />
                      <Label
                        htmlFor="size-large"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xl font-bold">7"</span>
                        <span className="text-sm font-medium">Large</span>
                        <span className="mt-2 text-primary font-bold">$129</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Display Type</h3>
                  <RadioGroup value={color} onValueChange={setColor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="bw" id="color-bw" className="peer sr-only" />
                      <Label
                        htmlFor="color-bw"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xl font-bold">Black & White</span>
                        <span className="text-sm font-medium">Classic E-Ink Display</span>
                        <span className="mt-2 text-primary font-bold">Included</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="color" id="color-full" className="peer sr-only" />
                      <Label
                        htmlFor="color-full"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xl font-bold">Color</span>
                        <span className="text-sm font-medium">Vibrant E-Ink Display</span>
                        <span className="mt-2 text-primary font-bold">+$30</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium mb-2">What's Included</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>FrameIt E-Ink Display</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>USB-C Charging Cable</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Wall Mount Kit</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>1-Year Warranty</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Free Web Dashboard Access</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePreorder} className="w-full">
                  Preorder Now
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Estimated delivery: Q4 2024. 50% deposit required at preorder.</p>
              <p className="mt-2">Secure payment processing by Lemon Squeezy.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 FrameIt. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

