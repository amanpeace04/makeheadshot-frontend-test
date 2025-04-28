// components/ui/PackageCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export interface Package {
  outfits: number;
  cost: number; // in paise
  custom_credits: number;
  backgrounds: number;
  package_name: string;
  headshots: number;
  description: string;
  styles: number;
  delivery_hours: number;
}

export interface PackageCardProps {
  pkg: Package;
  index: number;
  onBuy: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, index, onBuy }) => {
  const theme = useTheme();
  const priceLabel = (pkg.cost / 100).toFixed(0);
  const isProfessional = pkg.package_name.toLowerCase().includes("professional");

  return (
    <div className="h-full">
      <div className="p-8 h-full flex flex-col">
        <h3 className="text-2xl font-bold text-center text-corporate-dark mb-2">
          {pkg.package_name}
        </h3>
        <div className="text-center mb-6">
          <span className="text-5xl font-bold text-corporate-dark">
            ₹{priceLabel}
          </span>
          <span className="text-corporate-medium">/once</span>
        </div>
        <p className="text-center text-gray-600 mb-6">
          {pkg.description}
        </p>
        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-center">
            <div className="min-w-6 h-6 mr-3">
              <svg
                className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-gray-600">{pkg.headshots} headshots</span>
          </div>
          <div className="flex items-center">
            <div className="min-w-6 h-6 mr-3">
              <svg
                className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-gray-600">{pkg.styles} styles</span>
          </div>
          <div className="flex items-center">
            <div className="min-w-6 h-6 mr-3">
              <svg
                className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-gray-600">{pkg.backgrounds} backgrounds</span>
          </div>
          <div className="flex items-center">
            <div className="min-w-6 h-6 mr-3">
              <svg
                className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-gray-600">{pkg.outfits} outfits</span>
          </div>
          <div className="flex items-center">
            <div className="min-w-6 h-6 mr-3">
              <svg
                className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-gray-600">{pkg.delivery_hours}-hour delivery</span>
          </div>
          <div className="flex items-center">
            {pkg.custom_credits > 0 ? (
              <>
                <div className="min-w-6 h-6 mr-3">
                  <svg
                    className="w-6 h-6 bg-gradient-to-r from-corporate-blue to-corporate-green rounded-full p-1"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-gray-600">{pkg.custom_credits} custom credits</span>
              </>
            ) : (
              <>
                <div className="min-w-6 h-6 mr-3">
                  <svg
                    className="w-6 h-6 text-gray-300 rounded-full p-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </div>
                <span className="text-gray-400">No custom credits</span>
              </>
            )}
          </div>
        </div>

        {/* Keep the original Button but style it accordingly */}
        <div className="mt-auto">
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 600,
              borderRadius: '8px',
              background: isProfessional 
                ? 'linear-gradient(to right, var(--corporate-blue), var(--corporate-green))' 
                : 'rgba(0, 0, 0, 0.06)',
              color: isProfessional ? 'white' : 'rgba(0, 0, 0, 0.87)',
              '&:hover': {
                background: 'linear-gradient(to right, var(--corporate-blue), var(--corporate-green))',
                color: 'white',
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s ease'
            }}
            onClick={() => onBuy(pkg)}
          >
            Buy {pkg.package_name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;