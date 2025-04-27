// src/components/ui/ContainerTextFlip.tsx
"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ContainerTextFlipProps {
  /** The list of lines to flip through */
  phrases: string[];
  /** How long (ms) each phrase stays before flipping */
  interval?: number;
  className?: string;
}

export function ContainerTextFlip({
  phrases,
  interval = 2500,
  className,
}: ContainerTextFlipProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(iv);
  }, [phrases.length, interval]);

  return (
    <div
      className={cn(
        "relative h-8 overflow-hidden", // fixed height equal to one line
        className
      )}
    >
      {phrases.map((text, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-x-0 transition-transform duration-500 ease-in-out",
            i === idx ? "translate-y-0" : "translate-y-full"
          )}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
