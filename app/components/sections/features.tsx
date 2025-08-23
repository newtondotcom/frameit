import { Bento } from "@/components/bento"

export default function Features() {
  return (
    <div className="min-w-full container px-4 md:px-6 space-y-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" id="features-heading">
            Key Features
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Natural paper-like aesthetic with no glare or backlight. Web interface for easy configuration. 
            Open-source and customizable with scheduled playlists and plugin support—perfect for beginners and makers alike.
          </p>
        </div>
      </div>
      <Bento />
    </div>
  )
}

