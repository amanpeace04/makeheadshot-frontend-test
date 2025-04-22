import React from "react";

interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700">
        {children}
      </div>
    </div>
  );
};
