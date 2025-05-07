// File: src/components/ui/MultiStepForm.tsx

"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  ageOptions,
  genderOptions,
  bodyTypeOptions,
  eyeColorOptions,
  spectaclesOptions,
} from "@/constants/dropdownOptions";
import {
  MultiStepFormProvider,
  useFormContext,
} from "@/context/MultiStepFormContext";

import BackgroundSelection from "@/components/ui/BackgroundSelection";
import SelectedCombinations from "@/components/ui/SelectedCombinations";
import FinalPreview from "@/components/ui/FinalPreview";
const steps = [
  "Personal Info",
  "Physical Details",
  "Select Backgrounds",
  "Review Selections",
  "Finalize & Submit", // new last step
];

function InnerForm() {
  const ctx = useFormContext();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Step 0: Personal Info */}
      {ctx.activeStep === 0 && (
        <CardContent>
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Add your personal info
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              This information helps our AI create headshots that look like you.
              It will be deleted after your headshots are completed.
            </Typography>
          </Box>

          <Box component={Card} sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
            <TextField
              fullWidth
              label="Email *"
              value={ctx.email}
              onChange={(e) => ctx.setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Name *"
              value={ctx.name}
              onChange={(e) => ctx.setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Age *"
              value={ctx.age}
              onChange={(e) => ctx.setAge(e.target.value)}
              sx={{ mb: 2 }}
            />
            {/* <TextField
              select
              fullWidth
              label="Age *"
              value={ctx.age}
              onChange={(e) => ctx.setAge(e.target.value)}
              sx={{ mb: 2 }}
            >
              {ageOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              select
              fullWidth
              label="Gender *"
              value={ctx.gender}
              onChange={(e) => ctx.setGender(e.target.value)}
            >
              {genderOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
      )}
      {/* Step 1: Physical Details */}
      {ctx.activeStep === 1 && (
        <CardContent>
          <Box component={Card} sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
            <TextField
              select
              fullWidth
              label="Body Type *"
              value={ctx.bodyType}
              onChange={(e) => ctx.setBodyType(e.target.value)}
              sx={{ mb: 2 }}
            >
              {bodyTypeOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Weight (kg) *"
                value={ctx.weight}
                onChange={(e) => ctx.setWeight(e.target.value)}
              />
              <TextField
                fullWidth
                type="number"
                label="Height (cm) *"
                value={ctx.height}
                onChange={(e) => ctx.setHeight(e.target.value)}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                select
                fullWidth
                label="Eye Color *"
                value={ctx.eyeColor}
                onChange={(e) => ctx.setEyeColor(e.target.value)}
                sx={{ mb: 2 }}
              >
                {eyeColorOptions.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Spectacles *"
                value={ctx.spectacles}
                onChange={(e) => ctx.setSpectacles(e.target.value)}
              >
                {spectaclesOptions.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </CardContent>
      )}
      {/* Step 3: Review Selections */}+{" "}
      {ctx.activeStep === 3 && <SelectedCombinations />}
      {/* Step 2: Select Backgrounds */}
      {ctx.activeStep === 2 && <BackgroundSelection />}
      {ctx.activeStep === steps.length - 1 && <FinalPreview />}
      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          pt: 2,
        }}
      >
        <Button disabled={ctx.activeStep === 0} onClick={ctx.prevStep}>
          Back
        </Button>
        {ctx.activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={ctx.nextStep}
            sx={{
              background: "linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)",
              color: "#fff",
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={ctx.handleSubmit}
            disabled={ctx.submitting}
            sx={{
              background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
              color: "#fff",
            }}
          >
            {ctx.submitting ? "Submitting…" : "Submit"}
          </Button>
        )}
      </Box>
    </Box>
  );
}

function FormContent() {
  const { activeStep } = useFormContext();
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 6,
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)",
            py: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: "#fff", fontWeight: 600 }}>
            Your Headshot Details
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Animated Content */}
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <InnerForm />
          </motion.div>
        </AnimatePresence>
      </Paper>
    </Container>
  );
}

export default function MultiStepForm() {
  return (
    <MultiStepFormProvider>
      <FormContent />
    </MultiStepFormProvider>
  );
}
