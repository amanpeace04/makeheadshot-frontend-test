"use client";

import { DashboardLayout } from "@/components/User/Layout";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default RootLayout;
