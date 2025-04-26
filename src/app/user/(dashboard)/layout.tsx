"use client";

import { DashboardLayout } from "@/components/User/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { ImageValidationProvider } from "@/context/ImageValidationContext";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ImageValidationProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </ImageValidationProvider>
    </AuthProvider>
  );
}

export default RootLayout;
