"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepTransitionProps {
  children: ReactNode;
  step: number;
}

export default function StepTransition({
  children,
  step,
}: StepTransitionProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
