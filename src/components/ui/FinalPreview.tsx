"use client";

import React, { useState } from "react";
import { Box, Paper, Typography, Button, Avatar } from "@mui/material";
import { useFormContext } from "@/context/MultiStepFormContext";
import { useImageValidation } from "@/context/ImageValidationContext";
import ImageValidationModal from "./ImageValidationModal";

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
    prevStep,
  } = useFormContext();
  const { validatedFiles } = useImageValidation();

  const [modalOpen, setModalOpen] = useState(false);

  // On validation, keep modal open so user can see results
  const handleValidated = (success: boolean) => {
    // validatedFiles in context are updated; do not auto-close modal
  };

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
                  <strong>{job.background.replace(/_/g, " ")}</strong> –
                  {job.clothing.replace(/_/g, " ")}
                </Typography>
              ))}
            </Box>
            <Button variant="outlined" size="small" onClick={prevStep}>
              Edit styles
            </Button>
          </Box>
        </Box>

        {/* Uploaded photos or add photos */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Photos
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {validatedFiles.map((file, i) => (
              <Avatar
                variant="rounded"
                key={i}
                src={URL.createObjectURL(file)}
                sx={{ width: 56, height: 56 }}
              />
            ))}
          </Box>
          {validatedFiles.length > 0 ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModalOpen(true)}
            >
              Change photos
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => setModalOpen(true)}
            >
              Add photos
            </Button>
          )}
        </Box>
      </Paper>

      {/* Image Validation Modal; hide "Proceed to Payment" and keep open on validate */}
      <ImageValidationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onValidated={handleValidated}
        // no onProceedToPayment prop => modal will not show proceed button
      />
    </Box>
  );
}
