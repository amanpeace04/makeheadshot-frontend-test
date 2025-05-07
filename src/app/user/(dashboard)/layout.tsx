"use client";

import { DashboardLayout } from "@/components/User/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { ImageValidationProvider } from "@/context/ImageValidationContext";
import { MultiStepFormProvider } from "@/context/MultiStepFormContext";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ImageValidationProvider>
        <MultiStepFormProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </MultiStepFormProvider>
      </ImageValidationProvider>
    </AuthProvider>
  );
}

export default RootLayout;
