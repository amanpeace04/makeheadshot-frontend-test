// components/DashboardLayout.tsx
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Dashboard } from "./Dashboard";
import { Navbar } from "@/components/User/Header";
// import { Logo, LogoIcon } from "./Logo"; // wherever you put those

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 " />,
    },
    {
      label: "Profile",
      href: "/user/profile",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 " />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 " />,
    },
    {
      label: "Headshots",
      href: "/user/headshots",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 " />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border  bg-[#a2c8ee] md:flex-row ",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-[#a2c8ee]">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {/* <Logo /> */}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        {/* dashboard “frame” around whatever’s passed in */}
        <Dashboard>{children}</Dashboard>
      </div>
    </>
  );
};
