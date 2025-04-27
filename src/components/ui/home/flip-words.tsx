"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words = ["Developers", "Designers", "Creators", "Entrepreneurs", "Everyone"],
  duration = 1500,
  className,
  prefix = "",
  suffix = "",
  highlighted = false,
}: {
  words?: string[];
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  highlighted?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const currentWordRef = useRef(words[0]);

  useEffect(() => {
    let typingTimer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // Delete one character at a time
      if (displayText.length > 0) {
        typingTimer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        currentWordRef.current = words[(currentIndex + 1) % words.length];
        setIsTypingComplete(false);
      }
    } else {
      // Type one character at a time
      if (displayText.length < currentWordRef.current.length) {
        typingTimer = setTimeout(() => {
          setDisplayText(
            currentWordRef.current.slice(0, displayText.length + 1)
          );
        }, 100);
      } else {
        setIsTypingComplete(true);
        typingTimer = setTimeout(() => {
          setIsDeleting(true);
        }, duration);
      }
    }

    return () => clearTimeout(typingTimer);
  }, [displayText, isDeleting, duration, currentIndex, words]);

  return (
    <span className={className}>
      {prefix}
      <span
        className={cn(
          "inline-block",
          highlighted ? "px-2 py-0.5 rounded bg-blue-100 text-blue-700" : ""
        )}
      >
        {displayText}
        {!isTypingComplete && !isDeleting && (
          <span className="animate-blink">|</span>
        )}
      </span>
      {suffix}
    </span>
  );
};
