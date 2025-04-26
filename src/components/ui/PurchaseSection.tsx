// File: src/components/ui/PurchaseSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import ImageValidationModal from "@/components/ui/ImageValidationModal";
import PackageList from "@/components/ui/PackageList";
import apiHelper from "@/helpers/apiHelper";
import { useAuth } from "@/context/AuthContext";
import { useImageValidation } from "@/context/ImageValidationContext";
import { loadRazorpay } from "@/lib/loadRazorpay";

const steps = ["Select Package", "Validate Images", "Payment"];
const REQUIRED_IMAGES = 10;

export default function PurchaseSection() {
  const { validatedFiles } = useImageValidation();
  const { user } = useAuth();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [chosen, setChosen] = useState<Package | null>(null);
  const [openValidator, setOpenValidator] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { packages } = await apiHelper.get<{ packages: Package[] }>(
          "/api/packages",
          { headers: { "X-API-Key": "supersecret123" } }
        );
        setPackages(packages);
      } catch (err: any) {
        setError(err.message || "Failed to load packages");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelectPackage = (pkg: Package) => {
    setChosen(pkg);
    // Move to validation or directly to payment
    if (validatedFiles.length < REQUIRED_IMAGES) {
      setActiveStep(1);
      setOpenValidator(true);
    } else {
      setActiveStep(2);
      startPayment(pkg);
    }
  };

  // Callback from modal; 'success' indicates validation passed
  const onValidated = (success: boolean) => {
    setOpenValidator(false);
    if (success && chosen) {
      setActiveStep(2);
      startPayment(chosen);
    }
  };

  const startPayment = async (pkg: Package) => {
    if (!(await loadRazorpay())) {
      alert("Could not load payment SDK");
      setActiveStep(1);
      return;
    }
    try {
      const order = await apiHelper.post<{
        id: string;
        amount: number;
        currency: string;
      }>(
        "/api/payment/create-order",
        {
          user_email: user?.email,
          model_id: "model_123",
          package_name: pkg.package_name,
          amount: pkg.cost,
          currency: "INR",
          payment_mode: "razorpay",
        },
        { headers: { "X-API-Key": "supersecret123" } }
      );

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Portrait Pal",
        description: pkg.package_name,
        handler: async (resp: any) => {
          await apiHelper.post(
            "/api/payment/verify",
            {
              user_email: user?.email,
              model_id: "model_123",
              order_id: resp.razorpay_order_id,
              payment_id: resp.razorpay_payment_id,
              signature: resp.razorpay_signature,
            },
            { headers: { "X-API-Key": "supersecret123" } }
          );
          window.location.href = "/form";
        },
      };

      new (window as any).Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed");
      setActiveStep(1);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Get Your Portrait
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0: Package Selection */}
      {activeStep === 0 && (
        <PackageList packages={packages} onSelect={handleSelectPackage} />
      )}

      {/* Step 1: Image Validation */}
      {activeStep === 1 && (
        <Box textAlign="center" sx={{ mt: 6 }}>
          {chosen && (
            <Typography variant="h5" gutterBottom>
              Selected: {chosen.package_name}
            </Typography>
          )}
          <Typography variant="h6" gutterBottom>
            You've uploaded {validatedFiles.length} of {REQUIRED_IMAGES} images.
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button variant="outlined" onClick={() => setActiveStep(0)}>
              Back
            </Button>
            <Button variant="contained" onClick={() => setOpenValidator(true)}>
              Validate & Continue
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 2: Payment in progress */}
      {activeStep === 2 && (
        <Box textAlign="center" sx={{ mt: 6 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Redirecting to payment...
          </Typography>
        </Box>
      )}

      <ImageValidationModal
        open={openValidator}
        onClose={() => setOpenValidator(false)}
        onValidated={onValidated}
      />
    </Container>
  );
}
