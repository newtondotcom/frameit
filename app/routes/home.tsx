import type { Route } from "./+types/home";
import Welcome from "@/components/sections/welcome";
import Features from "@/components/sections/features";
import Specs from "@/components/sections/specs";
import Convinced from "@/components/sections/convinced";
import Content from "@/components/sections/content";
import { useEffect, useRef } from "react";
import { useRainbowStore } from "@/hooks/use-is-rainbow";
import { useInView } from "motion/react";
import Header from "@/components/layout/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FrameIt" },
    {
      name: "description",
      content:
        "Open-source, customizable E-Ink display powered by Raspberry Pi. Natural paper-like aesthetic with web interface for effortless content management. Display photos, weather, calendar, news, and more with minimal power consumption.",
    },
  ];
}

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref2, { once: true, amount: 0.2 });
  const { isRainbow, toggleRainbow } = useRainbowStore();

  useEffect(() => {
    if (isInView && !isRainbow) {
      toggleRainbow();
    }
  }, [isInView]);

  return (
    <>
      <Header />
      <main className="flex-1 snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth max-w-screen overflow-x-hidden">
        {/* Welcome Section */}
        <section className="relative snap-start h-screen w-full pt-24 flex flex-col justify-center items-center bg-background">
          {/* Neobrutalist background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-secondary to-accent" />
            <div
              className="absolute top-0 left-0 w-full h-full bg-repeat"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h25v25H0zM25 25h25v25H25zM50 0h25v25H50zM75 25h25v25H75z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          {/* Content layer */}
          <div className="relative z-10 py-8">
            <Welcome />
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center bg-secondary"
          ref={ref2}
        >
          <Features />
        </section>

        {/* Specs Section */}
        <section
          id="specs"
          ref={ref}
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center bg-accent"
        >
          <Specs />
        </section>

        {/* Content Section */}
        <section
          id="content"
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center bg-muted"
        >
          <Content />
        </section>

        {/* Convinced Section */}
        <section
          id="buy"
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center bg-primary"
        >
          <Convinced />
        </section>
      </main>
    </>
  );
}
