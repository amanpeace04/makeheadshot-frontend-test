// File: src/components/ui/PackageList.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import PackageCard, { Package } from "@/components/ui/PackageCard";

interface PackageListProps {
  packages: Package[];
  onSelect: (pkg: Package) => void;
}

export default function PackageList({ packages, onSelect }: PackageListProps) {
  // Sort packages to ensure Basic, Professional, Executive order
  const sortedPackages = [...packages].sort((a, b) => {
    const order = { "Basic": 1, "Professional": 2, "Executive": 3 };
    const aOrder = a.package_name.includes("Basic") ? order.Basic : 
                  a.package_name.includes("Professional") ? order.Professional :
                  a.package_name.includes("Executive") ? order.Executive : 99;
    
    const bOrder = b.package_name.includes("Basic") ? order.Basic : 
                  b.package_name.includes("Professional") ? order.Professional :
                  b.package_name.includes("Executive") ? order.Executive : 99;
                  
    return aOrder - bOrder;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {sortedPackages.map((pkg, index) => (
        <motion.div
          key={pkg.package_name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        >
          <div className={cn(
            "rounded-2xl h-full",
            pkg.package_name.toLowerCase().includes("professional") 
              ? "border-2 border-corporate-blue bg-white shadow-lg relative" 
              : "border-2 border-gray-200 bg-white shadow-sm"
          )}>
            {pkg.package_name.toLowerCase().includes("professional") && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-corporate-blue/10 to-corporate-green/10 -z-10"></div>
            )}

            <PackageCard 
              pkg={pkg} 
              index={index} 
              onBuy={onSelect} 
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}