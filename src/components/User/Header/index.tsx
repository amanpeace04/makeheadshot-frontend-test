// components/Navbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { LogoIcon } from "./Logo"; // or your full Logo
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; max-age=0; path=/";
    router.push("/login");
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-3 dark:bg-blue-600 dark:border-[#a2c8ee] border-b border-gray-200">
      {/* Left: Logo */}
      <div className="flex items-center">
        {/* <LogoIcon /> */}
        <span className="text-lg font-semibold tracking-wide">
          Make Headshot
        </span>
      </div>

      {/* Right: User menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center hover:cursor-pointer gap-1 px-3 py-2 rounded-md text-gray-800 dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-200 transition"
        >
          <span className="font-medium text-sm">{user?.name || "User"}</span>
          <IconChevronDown
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xl z-20 overflow-hidden animate-fade-in">
            <button
              onClick={() => router.push("/profile")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition hover:cursor-pointer"
            >
              <IconUser className="w-4 h-4" /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition hover:cursor-pointer"
            >
              <IconLogout className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
