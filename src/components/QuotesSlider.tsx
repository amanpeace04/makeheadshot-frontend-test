"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Quote {
  text: string;
  author: string;
  profession?: string;
}

const QuotesSlider: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [direction, setDirection] = useState(0);

  const quotes: Quote[] = [
    {
      text: "Choose a job you love, and you will never have to work a day in your life.",
      author: "Confucius",
      profession: "Philosopher",
    },
    {
      text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
      author: "Steve Jobs",
      profession: "Co-founder of Apple",
    },
    {
      text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      author: "Steve Jobs",
      profession: "Co-founder of Apple",
    },
    {
      text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      author: "Albert Schweitzer",
      profession: "Theologian & Humanitarian",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      profession: "Former First Lady & Diplomat",
    },
    {
      text: "The most difficult thing is the decision to act, the rest is merely tenacity.",
      author: "Amelia Earhart",
      profession: "Aviation Pioneer",
    },
    {
      text: "If you want to achieve greatness, stop asking for permission.",
      author: "Anonymous",
    },
    {
      text: "Your personal brand is what people say about you when you're not in the room.",
      author: "Jeff Bezos",
      profession: "Founder of Amazon",
    },
    {
      text: "Passion is energy. Feel the power that comes from focusing on what excites you.",
      author: "Oprah Winfrey",
      profession: "Media Executive & Philanthropist",
    },
    {
      text: "The most common way people give up their power is by thinking they don't have any.",
      author: "Alice Walker",
      profession: "Author & Activist",
    },
  ];

  useEffect(() => {
    // Rotate quotes every 6 seconds
    const timer = setInterval(() => {
      setDirection(1); // Forward direction
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 bg-gradient-to-r from-corporate-blue/5 to-corporate-green/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative h-40 md:h-32 flex items-center justify-center">
          <div className="w-full h-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={currentQuote}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="w-full text-center absolute left-0 right-0"
              >
                <p className="text-lg md:text-xl font-medium text-corporate-dark mb-2 px-4">
                  "{quotes[currentQuote].text}"
                </p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-corporate-blue font-semibold">
                    {quotes[currentQuote].author}
                  </p>
                  {quotes[currentQuote].profession && (
                    <>
                      <span className="text-corporate-medium">•</span>
                      <p className="text-corporate-medium">
                        {quotes[currentQuote].profession}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentQuote ? 1 : -1);
                  setCurrentQuote(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentQuote === index
                    ? "bg-corporate-blue w-6"
                    : "bg-corporate-blue/30 hover:bg-corporate-blue/50"
                )}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSlider;
