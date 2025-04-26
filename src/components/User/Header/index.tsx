// components/Navbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { LogoIcon } from "./Logo"; // or your full Logo
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  console.log("user from use Auth: ", user);
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
    <nav className="flex items-center justify-between px-4 py-2  dark:bg-[#a2c8ee] dark:border-[#a2c8ee]">
      {/* Left: Logo */}
      <div className="flex items-center">{/* <LogoIcon /> */}</div>

      {/* Right: User menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center space-x-1 text-gray-800 dark:text-gray-800"
        >
          <span className="font-medium">{user?.name || "User"}</span>
          <IconChevronDown className="w-4 h-4" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-20 overflow-hidden">
            <button
              onClick={() => router.push("/profile")}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <IconUser className="w-4 h-4 mr-2" /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <IconLogout className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
