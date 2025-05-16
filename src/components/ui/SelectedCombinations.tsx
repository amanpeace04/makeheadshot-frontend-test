// File: src/components/ui/SelectedCombinations.tsx
"use client";

import React from "react";
import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormContext } from "@/context/MultiStepFormContext";

export default function SelectedCombinations() {
  const { jobs, nextStep } = useFormContext();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Great choices! Ready to move on?
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        We're ready to create your headshots now! Double check your selections
        below then click continue.
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Selected combinations
        </Typography>
        {jobs.map((job, i) => (
          <Box
            key={`${job.combo_id}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              mb: 1,
              p: 1,
              border: (t) => `1px solid ${t.palette.grey[300]}`,
              borderRadius: 1,
            }}
          >
            <Typography>
              {job.background.replace(/_/g, " ")} →{" "}
              {job.clothing.replace(/_/g, " ")}
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                // remove a single combo
                const newJobs = [...jobs];
                newJobs.splice(i, 1);
                // @ts-ignore
                useFormContext().setJobs(newJobs);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
