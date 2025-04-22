// src/components/ProgressBar.tsx
"use client";

import { FC } from "react";
import { Box, Typography, useTheme } from "@mui/material";

type ProgressBarProps = {
  steps: string[];
  activeStep: number; // 1-based
};

export const ProgressBar: FC<ProgressBarProps> = ({ steps, activeStep }) => {
  const theme = useTheme();

  // build "auto 1fr auto 1fr auto..." for grid-template-columns
  const cols = Array(steps.length * 2 - 1)
    .fill(0)
    .map((_, i) => (i % 2 === 0 ? "auto" : "1fr"))
    .join(" ");

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", px: 2, mb: 4 }}>
      {/* --- Circles & Lines --- */}
      <Box
        display="grid"
        alignItems="center"
        gridTemplateColumns={cols}
        sx={{ height: 48 }}
      >
        {steps.map((_, i) => {
          const isActive = i + 1 === activeStep;
          const isCompleted = i + 1 < activeStep;

          return (
            <Box key={i} sx={{ display: "contents" }}>
              {/* Circle */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor:
                    isCompleted || isActive
                      ? theme.palette.primary.main
                      : theme.palette.grey[400],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {i + 1}
                </Typography>
              </Box>

              {/* Line (skip after last circle) */}
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    height: 4,
                    bgcolor: isCompleted
                      ? theme.palette.primary.main
                      : theme.palette.grey[400],
                    width: "100%",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* --- Labels beneath circles --- */}
      <Box
        display="grid"
        gridTemplateColumns={cols}
        mt={1}
        sx={{ userSelect: "none" }}
      >
        {steps.map((label, i) => (
          <Typography
            key={i}
            variant="caption"
            sx={{
              gridColumn: 2 * i + 1,
              justifySelf: "center",
              color:
                i + 1 === activeStep
                  ? theme.palette.text.primary
                  : theme.palette.grey[600],
              fontWeight: i + 1 === activeStep ? 600 : 400,
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
