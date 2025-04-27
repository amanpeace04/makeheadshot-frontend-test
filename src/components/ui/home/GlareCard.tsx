"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export const GlareCard = ({
  children,
  className,
  borderColor = "blue",
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: "blue" | "red" | "green" | "orange";
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  // Initial CSS vars
  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0.6",
    "--radius": "16px",
    "--easing": "cubic-bezier(.42,0,.58,1)",
  } as React.CSSProperties;

  // Foil pattern + glow gradients
  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg":
      "url(\"data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E\")",
    "--pattern": "var(--foil-svg) center/var(--foil-size) no-repeat",
    "--shade":
      "radial-gradient(farthest-corner at var(--m-x) var(--m-y), rgba(255,255,255,0.6) 10%, rgba(255,255,255,0) 80%) var(--bg-x) var(--bg-y)/300% no-repeat",
  } as React.CSSProperties;

  const updateStyles = () => {
    const el = refElement.current;
    if (!el) return;
    const { glare, background, rotate } = state.current;
    el.style.setProperty("--m-x", `${glare.x}%`);
    el.style.setProperty("--m-y", `${glare.y}%`);
    el.style.setProperty("--r-x", `${rotate.x}deg`);
    el.style.setProperty("--r-y", `${rotate.y}deg`);
    el.style.setProperty("--bg-x", `${background.x}%`);
    el.style.setProperty("--bg-y", `${background.y}%`);
  };

  // Generate border and gradient classes based on borderColor prop
  let borderClass = "";
  let gradientClass = "";

  switch (borderColor) {
    case "red":
      borderClass = "border-r-8 border-[#E63946]";
      gradientClass =
        "bg-gradient-to-b from-[#E63946] via-[#F27781] to-[#E63946]/70";
      break;
    case "blue":
      borderClass = "border-r-8 border-[#0A66C2]";
      gradientClass =
        "bg-gradient-to-b from-[#0A66C2] via-[#4A8FD9] to-[#0A66C2]/70";
      break;
    case "green":
      borderClass = "border-r-8 border-[#00A876]";
      gradientClass =
        "bg-gradient-to-b from-[#00A876] via-[#4ECAA3] to-[#00A876]/70";
      break;
    case "orange":
      borderClass = "border-r-8 border-[#FF6B35]";
      gradientClass =
        "bg-gradient-to-b from-[#FF6B35] via-[#FF9773] to-[#FF6B35]/70";
      break;
    default:
      borderClass = "border-r-8 border-[#0A66C2]";
      gradientClass =
        "bg-gradient-to-b from-[#0A66C2] via-[#4A8FD9] to-[#0A66C2]/70";
  }

  return (
    <div
      style={containerStyle}
      className={cn(
        "relative isolate [perspective:800px] transition-transform delay-[var(--delay)] will-change-transform w-full max-w-md md:w-[420px] [aspect-ratio:16/19] rounded-[var(--radius)] shadow-lg",
        className
      )}
      ref={refElement}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        const dx = px - 50;
        const dy = py - 50;
        const RF = 0.6; // Increased tilt effect
        state.current.background.x = 50 + px / 4 - 12.5;
        state.current.background.y = 50 + py / 3 - 16.7;
        state.current.rotate.x = -dy * RF;
        state.current.rotate.y = dx * RF;
        state.current.glare.x = px;
        state.current.glare.y = py;
        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        setTimeout(() => {
          if (isPointerInside.current && refElement.current) {
            refElement.current.style.setProperty("--duration", "0s");
          }
        }, 300);
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        const el = refElement.current;
        if (el) {
          el.style.removeProperty("--duration");
          state.current = {
            glare: { x: 50, y: 50 },
            background: { x: 50, y: 50 },
            rotate: { x: 0, y: 0 },
          };
          updateStyles();
        }
      }}
    >
      {/* Main card content */}
      <div
        className={cn(
          "h-full will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] [transform:rotateY(var(--r-y))_rotateX(var(--r-x))] overflow-hidden rounded-[var(--radius)] border border-gray-200 bg-white",
          borderClass
        )}
      >
        {/* Gradient overlay */}
        <div
          className={cn(
            "absolute top-0 right-0 w-8 h-full opacity-80",
            gradientClass
          )}
        ></div>

        {/* Content */}
        <div className="p-6 relative">{children}</div>
      </div>

      {/* Glare effect overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)] rounded-[var(--radius)]"
        style={backgroundStyle}
      />

      {/* Additional shine effect */}
      <div className="pointer-events-none absolute inset-0 rounded-[var(--radius)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_var(--m-x)_var(--m-y),white_0%,transparent_50%)]"
          style={{
            transform:
              "translate(calc((var(--m-x) - 50%) * 0.5px), calc((var(--m-y) - 50%) * 0.5px))",
          }}
        />
      </div>
    </div>
  );
};
