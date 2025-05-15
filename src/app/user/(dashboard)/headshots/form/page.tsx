// File: src/components/ui/MultiStepForm.tsx

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
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import apiHelper from "@/helpers/apiHelper";
import {
  ageOptions,
  genderOptions,
  bodyTypeOptions,
  eyeColorOptions,
  spectaclesOptions,
  packageOptions,
} from "@/constants/dropdownOptions";
import {
  MultiStepFormProvider,
  useFormContext,
} from "@/context/MultiStepFormContext";
import { useImageValidation } from "@/context/ImageValidationContext";

const steps = ["Personal Info", "Physical Details", "Professional & Package"];
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
  const theme = useTheme();

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
          </TextField>
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
        </CardContent>
      )}

      {ctx.activeStep === 2 && (
        <CardContent>
          <TextField
            fullWidth
            label="Profession *"
            value={ctx.profession}
            onChange={(e) => ctx.setProfession(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            fullWidth
            label="Package *"
            value={ctx.packageName}
            onChange={(e) => ctx.setPackageName(e.target.value)}
            sx={{ mb: 2 }}
          >
            {packageOptions.map((o) => (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="# Input Images *"
              value={ctx.userInputImagesCount}
              onChange={(e) => ctx.setUserInputImagesCount(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Total Output Images *"
              value={ctx.totalNumberOutputImages}
              onChange={(e) => ctx.setTotalNumberOutputImages(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="# Images to Generate *"
              value={ctx.numImages}
              onChange={(e) => ctx.setNumImages(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        </CardContent>
      )}

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
  const { email } = ctx;
  const { modelName } = useImageValidation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // don’t fire until both are set
    if (!email || !modelName) return;

    setLoading(true);
    apiHelper
      .get<PaymentValidateResponse>(
        `/api/payment/validate?email_id=${encodeURIComponent(
          email
        )}&model_id=${encodeURIComponent(modelName)}`
      )
      .then((res) => {
        if (res.payment_found) {
          // everything’s good; clear any error
          setError(null);
          // you can also stash the response into state here if you need it
        } else {
          setError("No payment record found. Please contact support.");
        }
      })
      .catch((e: any) => {
        setError(e.message || "Network error during validation.");
      })
      .finally(() => {
        // always clear the loader once the call completes
        setLoading(false);
      });
  }, [email, modelName]);

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

  // all good → show form
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
        <Stepper activeStep={ctx.activeStep} alternativeLabel sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Animated Content */}
        <AnimatePresence exitBeforeEnter>
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

export default function MultiStepForm() {
  return (
    <MultiStepFormProvider>
      <FormContent />
    </MultiStepFormProvider>
  );
}
