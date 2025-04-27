// src/components/ui/aurora-background.tsx
"use client";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={
        "relative overflow-hidden bg-[repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)] " +
        "bg-[length:350%_350%] animate-aurora " +
        className
      }
    >
      {children}
    </div>
  );
};
