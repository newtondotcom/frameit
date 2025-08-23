import { motion, useInView } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { TypingAnimation } from "../ui/text-typing";
import { useRef } from "react";

export default function Welcome() {
  const chevronsRef = useRef(null);
  const isInView = useInView(chevronsRef, { once: true, amount: 0.5 }); // Trigger when 50% of the icon is visible

  // Animation variants
  const chevronsVariants = {
    offscreen: {
      y: 100, // Start below the screen
      opacity: 0,
    },
    onscreen: {
      y: 0, // Move to the original position
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 1.5,
      },
    },
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center container px-4 py-8 md:px-6">
        <div className="flex flex-col justify-center space-y-12">
          <div className="flex flex-col justify-center space-y-4 w-full md:w-2/3 lg:w-1/2">
            <div className="space-y-2">
              <h1
                className="text-4xl font-black tracking-wider uppercase sm:text-6xl xl:text-7xl/none text-foreground bg-primary px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_theme(colors.black)] transform rotate-1 dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]"
                id="welcome-heading"
              >
                Open-Source E-Ink Display for Your Digital Life
              </h1>
              <p className="max-w-[600px] text-foreground font-bold text-lg md:text-2xl bg-secondary px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_theme(colors.black)] transform -rotate-1 dark:border-yellow-400 dark:shadow-[6px_6px_0px_0px_theme(colors.yellow.400)]">
                FrameIt is a customizable E-Ink display powered by Raspberry Pi. 
                With natural paper-like aesthetics and a simple web interface, 
                effortlessly display photos, weather, calendars, news, and more—all 
                with minimal power consumption and zero distractions.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl md:text-2xl font-black bg-accent px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_theme(colors.black)] mb-4 dark:border-yellow-400 dark:shadow-[4px_4px_0px_0px_theme(colors.yellow.400)]" aria-live="polite">
                Thought E-Ink was limited to black and white like your e-reader?
                WE DID TOO...
              </h3>
              <h2 className="text-4xl font-black flex flex-row space-x-4 items-center flex-wrap justify-center uppercase tracking-wider">
                <TypingAnimation duration={50} className="bg-muted text-muted-foreground px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_theme(colors.black)] dark:border-yellow-400 dark:shadow-[4px_4px_0px_0px_theme(colors.yellow.400)]">but it has</TypingAnimation>
                <TypingAnimation
                  duration={50}
                  delay={550}
                  className="bg-primary text-primary-foreground px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_theme(colors.black)] dark:border-yellow-400 dark:shadow-[4px_4px_0px_0px_theme(colors.yellow.400)]"
                >
                  vibrant colors!
                </TypingAnimation>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
