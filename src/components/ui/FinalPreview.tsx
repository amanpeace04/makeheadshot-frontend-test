// File: src/components/ui/FinalPreview.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { useFormContext } from "@/context/MultiStepFormContext";
import { useImageValidation } from "@/context/ImageValidationContext";

export default function FinalPreview() {
  const {
    name,
    age,
    gender,
    bodyType,
    weight,
    height,
    eyeColor,
    spectacles,
    jobs,
  } = useFormContext();
  const { validatedFiles } = useImageValidation();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePhotos, setAgreePhotos] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          All done!
        </Typography>
        <Typography color="textSecondary" sx={{ mt: 1 }}>
          No changes can be made once we pass this page over to our AI
          photographer.
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        {/* Two‐column layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* LEFT: your info + physical details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Your Info
            </Typography>
            <Box
              component="dl"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& dt, & dd": { width: "50%", m: 0, mb: 1 },
                "& dt": { fontWeight: 600 },
                "& dd": { color: "textSecondary" },
              }}
            >
              <Typography component="dt">Name</Typography>
              <Typography component="dd">{name}</Typography>

              <Typography component="dt">Age</Typography>
              <Typography component="dd">{age}</Typography>

              <Typography component="dt">Gender</Typography>
              <Typography component="dd">{gender}</Typography>

              <Typography component="dt">Body Type</Typography>
              <Typography component="dd">{bodyType}</Typography>

              <Typography component="dt">Height</Typography>
              <Typography component="dd">{height}</Typography>

              <Typography component="dt">Weight</Typography>
              <Typography component="dd">{weight}</Typography>

              <Typography component="dt">Eye Color</Typography>
              <Typography component="dd">{eyeColor}</Typography>

              <Typography component="dt">Spectacles</Typography>
              <Typography component="dd">{spectacles}</Typography>
            </Box>
          </Box>

          {/* RIGHT: your selected styles */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Your Styles
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              {jobs.map((job, i) => (
                <Typography component="li" key={`${job.combo_id}-${i}`}>
                  <strong>{job.background.replace(/_/g, " ")}</strong> –{" "}
                  {job.clothing.replace(/_/g, " ")}
                </Typography>
              ))}
            </Box>
            <Button variant="outlined" size="small">
              Edit styles
            </Button>
          </Box>
        </Box>

        {/* Uploaded photos */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Photos
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {validatedFiles.map((file, i) => (
              <Avatar
                variant="rounded"
                key={i}
                src={URL.createObjectURL(file)}
                sx={{ width: 56, height: 56 }}
              />
            ))}
          </Box>
          <Button variant="outlined" size="small" sx={{ mt: 2 }}>
            Change photos
          </Button>
        </Box>
      </Paper>

      {/* Checkboxes & Submit */}
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms((v) => !v)}
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{" "}
              <a href="#" target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>
              ,{" "}
              <a href="#" target="_blank" rel="noopener noreferrer">
                privacy policy
              </a>{" "}
              and the{" "}
              <a href="#" target="_blank" rel="noopener noreferrer">
                upload requirements
              </a>
              .
            </Typography>
          }
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreePhotos}
              onChange={() => setAgreePhotos((v) => !v)}
            />
          }
          label={
            <Typography variant="body2">
              I have uploaded my best photos and understand these will influence
              the final result.
            </Typography>
          }
        />
      </Box>
      <Button
        variant="contained"
        disabled={!(agreeTerms && agreePhotos)}
        onClick={() => useFormContext().handleSubmit()}
      >
        Submit my photos
      </Button>
    </Box>
  );
}
