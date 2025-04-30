// File: src/components/ui/BackgroundSelection.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormContext } from "@/context/MultiStepFormContext";
import { backdropOptions } from "@/constants/backdropOptions";

export default function BackgroundSelection() {
  const theme = useTheme();
  const { setJobs } = useFormContext();
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  // sync into global form context
  useEffect(() => {
    setJobs(
      selected.map((bg) => ({
        combo_id: bg,
        background: bg,
        clothing: "",
        number_of_images: 0,
      }))
    );
  }, [selected, setJobs]);

  const visible = backdropOptions.filter((o) =>
    o.label.toLowerCase().includes(filter.toLowerCase())
  );

  const addBackground = (id: string) => setSelected((prev) => [...prev, id]);
  const removeOne = (index: number) =>
    setSelected((prev) => prev.filter((_, i) => i !== index));
  const clearAll = () => setSelected([]);

  return (
    <Box sx={{ p: 4 }}>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Available Column */}
        <div className="flex-1">
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Available Backdrops
            </Typography>
            <TextField
              fullWidth
              placeholder="Search backdrops…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Tailwind grid: 1 col xs, 2 cols sm, 3 cols md+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {visible.map((opt) => {
                const count = selected.filter((id) => id === opt.id).length;
                const isSelected = count > 0;

                return (
                  <Card
                    key={opt.id}
                    elevation={isSelected ? 8 : 2}
                    className={`
                      flex flex-col justify-between
                      rounded-xl overflow-hidden
                      border-2 ${
                        isSelected ? "border-primary-600" : "border-transparent"
                      }
                      transition-transform hover:scale-105 hover:shadow-lg
                      h-full
                    `}
                  >
                    {/* fixed-height image container */}
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={opt.src}
                        alt={opt.label}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <CardContent className="flex items-center justify-between">
                      <div>
                        <Typography noWrap sx={{ fontWeight: 500 }}>
                          {opt.label}
                        </Typography>
                        {isSelected && (
                          <Typography variant="caption" color="primary">
                            × {count}
                          </Typography>
                        )}
                      </div>
                      <Button
                        size="small"
                        onClick={() => addBackground(opt.id)}
                      >
                        Select +
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Paper>
        </div>

        {/* Selected Column */}
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
              <Typography variant="h6">Selected ({selected.length})</Typography>
              <Button size="small" onClick={clearAll}>
                Clear All
              </Button>
            </Box>

            {selected.map((id, i) => {
              const opt = backdropOptions.find((o) => o.id === id)!;
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
                  <IconButton size="small" onClick={() => removeOne(i)}>
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
