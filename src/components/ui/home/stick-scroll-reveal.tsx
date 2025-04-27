// src/components/ui/sticky-scroll-reveal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  // Determine which card is “active” based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / content.length);
    const idx = breakpoints.reduce(
      (best, bp, i) =>
        Math.abs(latest - bp) < Math.abs(latest - breakpoints[best]) ? i : best,
      0
    );
    setActiveCard(idx);
  });

  const bgColors = ["#0f172a", "#000", "#171717"];
  const gradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];
  const [bg, setBg] = useState(gradients[0]);
  useEffect(() => {
    setBg(gradients[activeCard % gradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: bgColors[activeCard % bgColors.length],
      }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, i) => (
            <div key={i} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                className="mt-4 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      <div
        style={{ background: bg }}
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
          contentClassName || ""
        )}
      >
        {content[activeCard]?.content || null}
      </div>
    </motion.div>
  );
};
