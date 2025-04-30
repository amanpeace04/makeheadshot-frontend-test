// File: src/components/ui/ClothingSelection.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormContext } from "@/context/MultiStepFormContext";

// Replace these with your real assets
const CLOTHING_OPTIONS = [
  {
    id: "white_shirt",
    label: "White Shirt",
    src: "/images/clothing/white_shirt.jpg",
  },
  {
    id: "dark_blue_tailored_suit",
    label: "Dark Blue Tailored Suit",
    src: "/images/clothing/suit.jpg",
  },
  {
    id: "black_blazer",
    label: "Black Blazer",
    src: "/images/clothing/blazer.jpg",
  },
  {
    id: "casual_jeans",
    label: "Casual Jeans",
    src: "/images/clothing/jeans.jpg",
  },
  // …etc
];

export default function ClothingSelection() {
  const theme = useTheme();
  const { jobs, setJobs } = useFormContext();
  const [selected, setSelected] = useState<string[]>([]);

  const addClothing = (id: string) => {
    if (!selected.includes(id)) setSelected((prev) => [...prev, id]);
  };
  const removeClothing = (idx: number) =>
    setSelected((prev) => prev.filter((_, i) => i !== idx));

  // update jobs: one job per (background × clothing)
  useEffect(() => {
    const newJobs = [];
    for (let bgJob of jobs) {
      for (let cloth of selected) {
        newJobs.push({
          combo_id: `${bgJob.background}_${cloth}`,
          background: bgJob.background,
          clothing: cloth,
          number_of_images: bgJob.number_of_images,
        });
      }
    }
    setJobs(newJobs);
  }, [selected, jobs, setJobs]);

  return (
    <Box sx={{ p: 4 }}>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Available */}
        <div className="flex-1">
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Choose Clothing
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {CLOTHING_OPTIONS.map((opt) => {
                const isSelected = selected.includes(opt.id);

                return (
                  <Card
                    key={opt.id}
                    elevation={isSelected ? 8 : 2}
                    className={`
                      flex flex-col justify-between
                      rounded-xl overflow-hidden
                      border-2 ${
                        isSelected
                          ? `border-[${theme.palette.primary.main}]`
                          : "border-transparent"
                      }
                      transition-transform hover:scale-105 hover:shadow-lg
                      h-full
                    `}
                  >
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={opt.src}
                        alt={opt.label}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <CardContent className="flex items-center justify-between">
                      <Typography noWrap sx={{ fontWeight: 500 }}>
                        {opt.label}
                      </Typography>
                      <Button
                        size="small"
                        disabled={isSelected}
                        onClick={() => addClothing(opt.id)}
                      >
                        {isSelected ? "Selected" : "Select +"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Paper>
        </div>

        {/* Selected */}
        <div className="w-full md:w-1/3">
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              maxHeight: 600,
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">
                Selected Clothing ({selected.length})
              </Typography>
            </Box>

            {selected.map((id, i) => {
              const opt = CLOTHING_OPTIONS.find((o) => o.id === id)!;
              return (
                <Box
                  key={`${id}-${i}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    p: 1,
                    border: `1px solid ${theme.palette.grey[300]}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography noWrap>{opt.label}</Typography>
                  <IconButton size="small" onClick={() => removeClothing(i)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Paper>
        </div>
      </div>
    </Box>
  );
}
