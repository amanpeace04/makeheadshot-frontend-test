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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": { boxShadow: `0 8px 20px ${theme.palette.grey[400]}` },
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <Typography variant="h6">{pkg.package_name}</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, my: 1 }}>
            ₹{priceLabel}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, px: 2 }}
          >
            {pkg.description}
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {[
              `${pkg.headshots} headshots`,
              `${pkg.styles} styles`,
              `${pkg.backgrounds} backgrounds`,
              `${pkg.outfits} outfits`,
              `${pkg.custom_credits} custom credits`,
              `${pkg.delivery_hours}-hour delivery`,
            ].map((line) => (
              <Typography
                component="li"
                variant="subtitle2"
                key={line}
                sx={{ mb: 0.5 }}
              >
                {line}
              </Typography>
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontWeight: 600 }}
            onClick={() => onBuy(pkg)}
          >
            Buy {pkg.package_name}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
