// src/components/ui/HoverBorderGradient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react"; // ← use the 'motion' package
import { cn } from "@/lib/utils"; // ← fixed path

type Direction = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

type HoverBorderGradientProps<E extends React.ElementType> = {
  as?: E;
  duration?: number;
  clockwise?: boolean;
  containerClassName?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, "as">;

export function HoverBorderGradient<E extends React.ElementType = "button">(
  props: HoverBorderGradientProps<E>
) {
  const {
    as,
    duration = 1,
    clockwise = true,
    containerClassName,
    className,
    children,
    ...rest
  } = props;

  const Tag = (as || "button") as React.ElementType;
  const [hovered, setHovered] = useState(false);
  const [dir, setDir] = useState<Direction>("TOP");

  // Cycle direction helper
  const rotate = (d: Direction): Direction => {
    const arr: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const i = arr.indexOf(d);
    return arr[
      clockwise ? (i - 1 + arr.length) % arr.length : (i + 1) % arr.length
    ];
  };

  // Every <duration> sec, rotate—unless hovered
  useEffect(() => {
    if (!hovered) {
      const iv = setInterval(() => setDir((d) => rotate(d)), duration * 1000);
      return () => clearInterval(iv);
    }
  }, [hovered, duration, clockwise]);

  const gradients: Record<Direction, string> = {
    TOP: "radial-gradient(20% 50% at 50% 0%, #fff 0%, transparent 100%)",
    RIGHT: "radial-gradient(16% 41% at 100% 50%, #fff 0%, transparent 100%)",
    BOTTOM: "radial-gradient(20% 50% at 50% 100%, #fff 0%, transparent 100%)",
    LEFT: "radial-gradient(16% 43% at 0% 50%, #fff 0%, transparent 100%)",
  };
  const highlight =
    "radial-gradient(75% 181% at 50% 50%, #3275F8 0%, rgba(50,117,248,0) 100%)";

  return (
    <Tag
      {...(rest as any)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex items-center p-px rounded-full overflow-visible",
        containerClassName
      )}
    >
      <div className={cn("relative z-10 rounded-full", className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 rounded-full z-0 pointer-events-none"
        style={{ filter: "blur(3px)" }}
        initial={{ background: gradients[dir] }}
        animate={{
          background: hovered ? [gradients[dir], highlight] : gradients[dir],
        }}
        transition={{ duration, ease: "linear" }}
      />
    </Tag>
  );
}
