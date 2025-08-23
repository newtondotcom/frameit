import { RainbowButton } from "@/components/ui/rainbow-button";
import Footer from "@/components/layout/footer";
import { Link } from "react-router";

export default function Convinced() {
  return (
    <div className="min-w-full container px-4 md:px-6 justify-between flex flex-col h-full">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-6">
          <h2
            className="text-5xl font-black tracking-wider uppercase sm:text-6xl md:text-7xl bg-secondary text-secondary-foreground px-8 py-4 border-4 border-black shadow-[12px_12px_0px_0px_theme(colors.black)] transform -rotate-1 dark:border-yellow-400 dark:shadow-[12px_12px_0px_0px_theme(colors.yellow.400)]"
            id="convinced-heading"
          >
            READY TO TRANSFORM?
          </h2>
          <p className="max-w-[600px] mx-auto text-foreground font-bold text-xl md:text-2xl bg-accent text-accent-foreground px-6 py-4 border-4 border-black shadow-[8px_8px_0px_0px_theme(colors.black)] transform rotate-1 dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]">
            Join the revolution in digital displays that combines cutting-edge
            technology with the timeless comfort of paper.
          </p>
        </div>
        <div className="flex flex-col mx-auto max-w-5xl py-12 items-center">
          <Link to={"/buy"}>
            <RainbowButton aria-label="Purchase FrameIt">
              Experience FrameIt
            </RainbowButton>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
