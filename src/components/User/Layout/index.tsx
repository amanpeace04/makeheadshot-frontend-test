// components/DashboardLayout.tsx
"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconUserBolt,
} from "@tabler/icons-react";
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
      href: "/user",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Packages",
      href: "/user/headshots",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col md:flex-row min-h-screen overflow-hidden bg-blue-600 border rounded-md"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-blue-600 p-4">
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="mt-6 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
          <Dashboard>{children}</Dashboard>
        </div>
      </div>
    </>
  );
};
