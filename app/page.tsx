import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import WaitlistForm from "@/components/waitlist-form";
import { BentoDemo } from "@/components/features";

export default function Home() {
  const parallaxItems = [
    {
      title: '3.5" Compact Frame',
      link: "/preorder",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      title: '5" Medium Frame',
      link: "/preorder",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      title: '7" Large Frame',
      link: "/preorder",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      title: "Black & White Display",
      link: "/preorder",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      title: "Color Display",
      link: "/preorder",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
  ];

  const features = [
    {
      title: "Photo Gallery",
      description:
        "Display your favorite memories with API integration for automatic updates",
      icon: "image",
    },
    {
      title: "Family Connection",
      description:
        "Help elderly family members stay connected with slideshow of family photos",
      icon: "users",
    },
    {
      title: "Personal Messages",
      description: "Share special notes and messages with loved ones",
      icon: "message-square",
    },
    {
      title: "Information Display",
      description: "Show date, weather, and calendar information at a glance",
      icon: "calendar",
    },
    {
      title: "Web Management",
      description: "Easily control content through an intuitive web interface",
      icon: "laptop",
    },
    {
      title: "Secure Connection",
      description: "End-to-end encryption keeps your personal content private",
      icon: "shield",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl">FrameIt</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="#specs"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Specs
          </Link>
          <Link
            href="#waitlist"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Waitlist
          </Link>
          <Link
            href="/preorder"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Preorder
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Redefining Digital Frames with E-Ink Technology
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Low power, always-on display that brings your memories to
                    life with the comfort of paper-like viewing.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/preorder">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground"
                    >
                      Preorder Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#waitlist">
                    <Button size="lg" variant="outline">
                      Join Waitlist
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center pt-12">
            <HeroVideoDialog
              className="block dark:hidden w-1/2"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
              thumbnailAlt="Hero Video"
            />
            <HeroVideoDialog
              className="hidden dark:block w-1/2"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            />
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover what makes FrameIt the perfect digital frame for your
                  home
                </p>
              </div>
            </div>
            <BentoDemo />
          </div>
        </section>

        <section id="specs" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Product Showcase
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Available in multiple sizes and colors to fit your needs
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12"></div>
          </div>
        </section>

        <section
          id="waitlist"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Waitlist
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be the first to know when FrameIt is available for purchase
                </p>
              </div>
              <div className="w-full max-w-md">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 FrameIt. All rights reserved.
        </p>
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
  );
}
