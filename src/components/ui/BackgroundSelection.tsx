// File: src/components/ui/BackgroundSelection.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormContext } from "@/context/MultiStepFormContext";
import { backdropOptions } from "@/constants/backdropOptions";
import { clothingOptions } from "@/constants/clothingOptions";

interface BackgroundSelectionProps {
  /** How many total background→clothing combos are allowed */
  selectionLimit?: number;
}

export default function BackgroundSelection({
  selectionLimit = 10,
}: BackgroundSelectionProps) {
  const theme = useTheme();
  const { jobs, addJob, setJobs, nextStep } = useFormContext();

  const [openBg, setOpenBg] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  // Filterable list of backdrops
  const visibleBgs = backdropOptions.filter((b) =>
    b.label.toLowerCase().includes(filter.toLowerCase())
  );

  // Add a job and close modal
  const pickClothing = (clothingId: string) => {
    if (openBg && jobs.length < selectionLimit) {
      addJob(clothingId, openBg, 1);
    }
    setOpenBg(null);
  };

  // Remove a combo at index i
  const removeJobAt = (i: number) => {
    setJobs(jobs.filter((_, idx) => idx !== i));
  };

  // Open the clothing-picker if under limit
  const openClothesFor = (bg: string) => {
    if (jobs.length < selectionLimit) {
      setOpenBg(bg);
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
      {/* LEFT: Available Backdrops (3/5 width) */}
      <Box sx={{ flex: 3 }}>
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
          <Box
            component="div"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            {visibleBgs.map((bg) => (
              <Card
                key={bg.id}
                elevation={2}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor:
                    jobs.length < selectionLimit ? "pointer" : "not-allowed",
                  opacity: jobs.length < selectionLimit ? 1 : 0.6,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform:
                      jobs.length < selectionLimit ? "scale(1.02)" : undefined,
                    boxShadow:
                      jobs.length < selectionLimit
                        ? theme.shadows[4]
                        : undefined,
                  },
                }}
                onClick={() => openClothesFor(bg.id)}
              >
                <CardMedia
                  component="img"
                  height={120}
                  image={bg.src}
                  alt={bg.label}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography noWrap sx={{ fontWeight: 500 }}>
                    {bg.label}
                  </Typography>
                  <Button size="small" sx={{ mt: 1 }}>
                    Select +
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* RIGHT: Selected Styles (2/5 width) */}
      <Box sx={{ flex: 2 }}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Selected Styles
            </Typography>
            <Box
              sx={{
                bgcolor:
                  jobs.length >= selectionLimit
                    ? theme.palette.success.main
                    : theme.palette.grey[300],
                color: "#fff",
                px: 2,
                py: 0.5,
                borderRadius: 8,
                fontSize: "0.875rem",
              }}
            >
              {jobs.length}/{selectionLimit}
            </Box>
          </Box>

          {jobs.map((job, i) => (
            <Box
              key={`${job.combo_id}-${i}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                p: 1,
                border: (t) => `1px solid ${t.palette.grey[300]}`,
                borderRadius: 1,
              }}
            >
              <Typography noWrap>
                <strong>{job.background.replace(/_/g, " ")}</strong> →{" "}
                {job.clothing.replace(/_/g, " ")}
              </Typography>
              <IconButton size="small" onClick={() => removeJobAt(i)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          {/* placeholders up to limit */}
          {Array.from({ length: selectionLimit - jobs.length }).map(
            (_, idx) => (
              <Box
                key={`placeholder-${idx}`}
                sx={{
                  mb: 1,
                  p: 2,
                  border: (t) => `2px dashed ${t.palette.grey[300]}`,
                  borderRadius: 1,
                  color: (t) => t.palette.grey[500],
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Style not yet selected
              </Box>
            )
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={jobs.length < selectionLimit}
            onClick={nextStep}
          >
            Continue
          </Button>
        </Paper>
      </Box>

      {/* Clothing-picker modal */}
      <Dialog
        open={!!openBg}
        onClose={() => setOpenBg(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Which outfit do you want to wear?
          <IconButton
            aria-label="close"
            onClick={() => setOpenBg(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{ px: 3, pb: 3 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Match your{" "}
            <strong>
              {backdropOptions.find((b) => b.id === openBg)?.label}
            </strong>{" "}
            background with an outfit you want to wear with.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            {clothingOptions.map((c) => (
              <Card
                key={`${openBg}-${c.id}`}
                elevation={2}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                  transition: "all 0.3s",
                }}
                onClick={() => pickClothing(c.id)}
              >
                <CardMedia
                  component="img"
                  height={120}
                  image={c.src}
                  alt={c.label}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography noWrap>{c.label}</Typography>
                  <Button size="small" sx={{ mt: 1 }}>
                    Select +
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
