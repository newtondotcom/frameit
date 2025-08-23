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
        <section className="relative snap-start h-screen w-full pt-24 flex flex-col justify-center items-center">
          {/* Background image with scaling and blur effect */}
          <div className="absolute inset-0 bg-[url(/kitchen.jpg)] bg-cover bg-center bg-opacity-50 blur-sm scale-105"></div>

          {/* Content layer */}
          <div className="relative z-10">
            <Welcome />
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center"
          ref={ref2}
        >
          <Features />
        </section>

        {/* Specs Section */}
        <section
          id="specs"
          ref={ref}
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center"
        >
          <Specs />
        </section>

        {/* Content Section */}
        <section
          id="content"
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center"
        >
          <Content />
        </section>

        {/* Convinced Section */}
        <section
          id="buy"
          className="snap-start h-screen w-full pt-24 flex flex-col justify-center items-center"
        >
          <Convinced />
        </section>
      </main>
    </>
  );
}
