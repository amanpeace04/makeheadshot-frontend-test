"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

const FocusCard = ({
  children,
  className,
  isFocused,
  onMouseEnter,
  cardType = "default",
}: {
  children: React.ReactNode;
  className?: string;
  isFocused: boolean;
  onMouseEnter: () => void;
  cardType?: "default" | "primary";
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 ease-in-out cursor-pointer",
        isFocused
          ? "shadow-lg scale-[1.02] z-10 border-corporate-blue/50"
          : "opacity-60 scale-100 z-0 blur-[0.2px]",
        cardType === "primary" &&
          isFocused &&
          "bg-gradient-to-br from-corporate-blue/5 to-corporate-green/5",
        className
      )}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all duration-300",
          isFocused
            ? "bg-gradient-to-r from-corporate-blue to-corporate-green opacity-100"
            : "opacity-0"
        )}
      />
      {children}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle clicks inside the section to reset focus
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only reset if click is directly on the container (not on cards)
    if (e.target === e.currentTarget) {
      setFocusedIndex(null);
    }
  };

  // Handle clicks outside the cards
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If clicking outside section OR on the section background (not on cards)
      if (
        !sectionRef.current?.contains(event.target as Node) ||
        event.target === sectionRef.current
      ) {
        setFocusedIndex(null);
      }
    };

    const handleMouseLeave = () => {
      setFocusedIndex(null);
    };

    document.addEventListener("mousedown", handleClickOutside);

    if (sectionRef.current) {
      sectionRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // FAQ data
  const faqData = [
    {
      question: "What kind of photos do I need to upload?",
      answer:
        "Make variety a priority. Varied facial expressions and varied backgrounds, taken at various times of the day, are the keys to high quality input photos. Oh, and minimal makeup and accessories, please!",
    },
    {
      question: "What do you do with my uploaded photos?",
      answer:
        "The photos you upload are used to train our AI model so it can create realistic AI headshots. These input photos are deleted within 7 days, but you can instantly delete them at any time with our 'Delete' button.",
    },
    {
      question: "Who owns my AI photos?",
      answer:
        "You do. We grant you full commercial license and ownership over your photos.",
      primary: true,
    },
    {
      question: "What if I don't like my photos?",
      answer:
        "No problem. We promise 3-6 keepers in every order. If you don't find at least 3 incredible headshots, just don't download any of your results and we'll refund you in full.",
    },
    {
      question: "How long does an AI headshot take?",
      answer:
        "We don't cut corners when it comes to generating photorealistic AI headshots. We're not the fastest, but you'll always get same-day results with Headshots AI. Our Executive package is delivered in 1 hour or less.",
    },
    {
      question: "What do people misunderstand about AI headshots?",
      answer:
        "Not every photo is perfect. Due to the nature of AI, you might see some strange photos. Headshots AI tries to make this clear from the start: not every photo is perfect, but we promise you'll find a profile-worthy headshot in every order to make it all worth it.",
      primary: true,
    },
    {
      question: "How many good photos can I expect?",
      answer:
        "The amount of keeper headshots you get back will largely depend on the photos you provide us with. Customers who make an effort to follow the instructions closely often walk away with 8-10+ incredible photos. At the very least, we guarantee you'll get a Profile-Worthy headshot back.",
    },
    {
      question: "Is there a free AI headshot generator?",
      answer:
        "Yes, Headshots AI has a 100% free AI headshot generator for simple photos. No email is required and no credit card is required. It is completely free.",
    },
    {
      question: "What is the most realistic headshot AI?",
      answer:
        "Headshots AI is the most realistic headshot AI with the most reviews in USA. It's the only major AI headshot generator using Flux to generate realistic AI headshots. Headshots AI is regularly used by professionals, companies and photographers.",
      primary: true,
    },
    {
      question: "Can I use AI headshots on LinkedIn?",
      answer:
        "25% of Headshots AI customers use their AI headshots on LinkedIn. It's totally okay to use AI headshots on LinkedIn.",
    },
    {
      question: "Can ChatGPT generate headshots?",
      answer:
        "Yes, ChatGPT can generate very basic headshots. These headshots aren't realistic enough to use professionally, but they can be fun to play around with. Use Headshots AI for AI headshots you can use professionally.",
    },
    {
      question: "What AI should I use for headshots?",
      answer:
        "The best AI headshot generators are using Flux to maximize realism. Right now, Headshots AI is the only major headshot AI powered by Flux. You can get up to 200 professional AI headshots within 2 hours",
    },
  ];

  return (
    <section
      id="faq"
      className="pt-20 pb-32 bg-white relative"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4" onClick={handleContainerClick}>
        <h2 className="text-4xl font-bold text-center mb-4 text-corporate-dark">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-corporate-blue to-corporate-green bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="text-xl text-center text-corporate-medium mb-6 max-w-3xl mx-auto">
          Get answers to common questions about our professional AI-generated
          headshot service for individuals and remote teams.
        </p>
        <p className="text-center text-corporate-blue font-medium mb-12">
          Full commercial rights and ownership of your AI-generated headshots
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative transition-all duration-2200 ease-in-out"
          style={{ minHeight: "600px", overflow: "visible" }}
        >
          {" "}
          {faqData.map((faq, index) => (
            <FocusCard
              key={index}
              isFocused={focusedIndex === index}
              onMouseEnter={() => setFocusedIndex(index)}
              cardType={faq.primary ? "primary" : "default"}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              >
                <h3
                  className={cn(
                    "text-lg font-semibold mb-3",
                    focusedIndex === index
                      ? "text-corporate-blue"
                      : "text-corporate-dark"
                  )}
                >
                  {faq.question}
                </h3>
                <p
                  className={cn(
                    "text-corporate-medium text-sm transition-all duration-2200 ease-in-out",
                    focusedIndex === index
                      ? "block max-h-[500px]"
                      : "line-clamp-2 max-h-[48px]"
                  )}
                >
                  {faq.answer}
                </p>
              </motion.div>
            </FocusCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
