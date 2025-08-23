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
      <div className="h-screen flex flex-col justify-center container px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-12">
          <div className="flex flex-col justify-center space-y-4 w-full md:w-2/3 lg:w-1/2">
            <div className="space-y-2">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                id="welcome-heading"
              >
                Open-Source E-Ink Display for Your Digital Life
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                FrameIt is a customizable E-Ink display powered by Raspberry Pi. 
                With natural paper-like aesthetics and a simple web interface, 
                effortlessly display photos, weather, calendars, news, and more—all 
                with minimal power consumption and zero distractions.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg md:text-xl" aria-live="polite">
                Thought E-Ink was limited to black and white like your e-reader?
                We did too...
              </h3>
              <h2 className="text-3xl flex flex-row space-x-2 items-center flex-wrap justify-center">
                <TypingAnimation duration={50}>but it has</TypingAnimation>
                <TypingAnimation
                  duration={50}
                  delay={550}
                  className="underline"
                >
                  vibrant colors!
                </TypingAnimation>
              </h2>
              <span className="mt-4">
                {" "}
                Scroll down to discover our revolutionary technology in full
                color.
              </span>
              <motion.div
                ref={chevronsRef}
                initial="offscreen"
                animate={isInView ? "onscreen" : "offscreen"}
                variants={chevronsVariants}
                className="text-black dark:text-white"
                aria-hidden="true"
              >
                <ChevronsDown size={300} />
              </motion.div>
              <span className="sr-only">
                Scroll down to explore more about FrameIt
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
