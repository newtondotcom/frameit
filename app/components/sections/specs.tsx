import Configure from "@/components/configure";

export default function Specs() {
  return (
    <div className="min-w-full container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-6">
          <h2
            className="text-5xl font-black tracking-wider uppercase sm:text-6xl md:text-7xl bg-accent text-accent-foreground px-8 py-4 border-4 border-black shadow-[12px_12px_0px_0px_theme(colors.black)] transform -rotate-2 dark:border-yellow-400 dark:shadow-[12px_12px_0px_0px_theme(colors.yellow.400)]"
            id="specs-heading"
          >
            HARDWARE SPECS
          </h2>
          <p className="max-w-[900px] text-foreground font-bold text-xl md:text-2xl bg-muted text-muted-foreground px-6 py-4 border-4 border-black shadow-[8px_8px_0px_0px_theme(colors.black)] transform rotate-1 dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]">
            Compatible with Raspberry Pi 4, 3, or Zero 2 W. Supports Inky Impression displays (4", 5.7", 7.3", 13.3") 
            and Waveshare e-Paper displays in both full color and black & white options. Easy installation perfect for beginners.
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-auto max-w-5xl py-12 items-center">
        <Configure />
      </div>
    </div>
  );
}
