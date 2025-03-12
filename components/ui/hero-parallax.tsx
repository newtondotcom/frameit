"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Item {
  title: string
  thumbnail: string
  link: string
}

export function HeroParallax({ items }: { items: Item[] }) {
  const firstRow = items.slice(0, 3)
  const secondRow = items.slice(3, 5)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -600])
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, 600])
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, 15])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const rotateZ = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, 20])
  const translateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-700, 0, 0, -700])

  return (
    <div
      ref={ref}
      className="h-[120vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard key={product.title} title={product.title} thumbnail={product.thumbnail} link={product.link} />
          ))}
        </motion.div>
        <motion.div
          style={{
            translateX,
          }}
          className="flex flex-row mb-20 space-x-20"
        >
          {secondRow.map((product) => (
            <ProductCard key={product.title} title={product.title} thumbnail={product.thumbnail} link={product.link} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The perfect <br /> frame for your memories
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Choose from multiple sizes and display options to fit your space and style
      </p>
    </div>
  )
}

export const ProductCard = ({
  title,
  thumbnail,
  link,
}: {
  title: string
  thumbnail: string
  link: string
}) => {
  return (
    <Link
      href={link}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-xl border border-black/5 dark:border-white/5 overflow-hidden"
    >
      <Image
        src={thumbnail || "/placeholder.svg"}
        height="600"
        width="400"
        className="absolute inset-0 h-full w-full object-cover object-center"
        alt={title}
      />
      <div className="absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80 transition duration-500"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 transition duration-500">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <p className="text-white/80 text-sm">Click to explore</p>
      </div>
    </Link>
  )
}

