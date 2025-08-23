import { Bento } from "@/components/bento"

export default function Features() {
  return (
    <div className="min-w-full container px-4 md:px-6 space-y-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-6">
          <h2 className="text-5xl font-black tracking-wider uppercase sm:text-6xl md:text-7xl bg-primary text-primary-foreground px-8 py-4 border-4 border-black shadow-[12px_12px_0px_0px_theme(colors.black)] transform rotate-2 dark:border-yellow-400 dark:shadow-[12px_12px_0px_0px_theme(colors.yellow.400)]" id="features-heading">
            KEY FEATURES
          </h2>
          <p className="max-w-[900px] text-foreground font-bold text-xl md:text-2xl bg-secondary px-6 py-4 border-4 border-black shadow-[8px_8px_0px_0px_theme(colors.black)] transform -rotate-1 dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]">
            Natural paper-like aesthetic with no glare or backlight. Web interface for easy configuration. 
            Open-source and customizable with scheduled playlists and plugin support—perfect for beginners and makers alike.
          </p>
        </div>
      </div>
      <Bento />
    </div>
  )
}

