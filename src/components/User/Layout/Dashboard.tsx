import React from "react";
import { usePathname } from "next/navigation";
import PackagesSection from "@/components/ui/PurchaseSection";
import PreviousJobs from "@/components/ui/PreviousJobs";
interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const pathname = usePathname();

  // Only show packages on the main dashboard page
  const isMainDashboard =
    pathname === "/user" ||
    pathname === "/user/dashboard" ||
    pathname === "/user/(dashboard)";

  return (
    <div className="flex flex-1">
      <div className="flex min-h-screen w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700">
        {isMainDashboard ? (
          <div className="styled-packages-wrapper">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 text-corporate-dark">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-[var(--corporate-blue)] to-[var(--corporate-green)] bg-clip-text text-transparent">
                  Package
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select a package to get started with your professional portraits
              </p>
            </div>
<PreviousJobs />
            {/* Using the existing PackagesSection component - maintains all original logic */}
            <PackagesSection />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
