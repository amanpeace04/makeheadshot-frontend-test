"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

import apiHelper from "@/helpers/apiHelper";
import {
  genderOptions,
  bodyTypeOptions,
  eyeColorOptions,
  spectaclesOptions,
} from "@/constants/dropdownOptions";

import {
  MultiStepFormProvider,
  useFormContext,
} from "@/context/MultiStepFormContext";

import { useImageValidation } from "@/context/ImageValidationContext";
import BackgroundSelection from "@/components/ui/BackgroundSelection";
import SelectedCombinations from "@/components/ui/SelectedCombinations";
import FinalPreview from "@/components/ui/FinalPreview";

const steps = [
  "Personal Info",
  "Physical Details",
  "Select Backgrounds",
  "Review Selections",
  "Finalize & Submit",
];

interface PaymentValidateResponse {
  payment_found: boolean;
  payment_status: "pending" | "paid" | "failed";
  package_name: string;
  payment_id: string;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

function InnerForm() {
  const ctx = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {ctx.activeStep === 0 && (
        <CardContent>
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
          <TextField
            select
            fullWidth
            label="Gender *"
            value={ctx.gender}
            onChange={(e) => ctx.setGender(e.target.value)}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
      )}

      {ctx.activeStep === 1 && (
        <CardContent>
          <TextField
            select
            fullWidth
            label="Body Type *"
            value={ctx.bodyType}
            onChange={(e) => ctx.setBodyType(e.target.value)}
            sx={{ mb: 2 }}
          >
            {bodyTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
              {eyeColorOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              {spectaclesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
      )}

      {ctx.activeStep === 2 && <BackgroundSelection />}
      {ctx.activeStep === 3 && <SelectedCombinations />}
      {ctx.activeStep === 4 && <FinalPreview />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          pb: 3,
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
  const ctx = useFormContext();
  const { setPackageName } = useFormContext();
  const { modelName, setModelName } = useImageValidation();

  const searchParams = useSearchParams();
  const queryModelId = searchParams.get("modelID");
  const effectiveModelId = queryModelId || modelName;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (queryModelId) {
      setModelName(queryModelId);
    }

    if (!ctx.email || !effectiveModelId) return;

    apiHelper
      .get<PaymentValidateResponse>(
        `/api/payment/validate?email_id=${encodeURIComponent(
          ctx.email
        )}&model_id=${encodeURIComponent(effectiveModelId)}`
      )
      .then((res) => {
        if (res.payment_found) {
          setPackageName(res.package_name);
          setError(null);
        } else {
          setError("No payment record found. Please contact support.");
        }
      })
      .catch((err: any) => {
        setError(err.message || "Network error during validation.");
      })
      .finally(() => setLoading(false));
  }, [ctx.email, effectiveModelId]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f7fa",
        }}
      >
        <CircularProgress size={64} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f7fa",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, background: "#f5f7fa", minHeight: "100vh" }}
    >
      <Paper
        elevation={4}
        sx={{ mx: "auto", borderRadius: 3, overflow: "hidden" }}
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
        <Stepper activeStep={ctx.activeStep} alternativeLabel sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ctx.activeStep}
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

export default function MultiStepFormPage() {
  return (
    <MultiStepFormProvider>
      <FormContent />
    </MultiStepFormProvider>
  );
}
