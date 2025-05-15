"use client";

import React, { useState } from "react";
import { Container, Grid, Box, Modal } from "@mui/material";
import PackagesSection from "@/components//ui/PurchaseSection";
import { Package } from "@/components/ui/PackageCard";
import ImageValidationModal from "@/components/ui/ImageValidationModal";
import { useImageValidation } from "@/context/ImageValidationContext";
import { useAuth } from "@/context/AuthContext";
import { loadRazorpay } from "@/lib/loadRazorpay";
import apiHelper from "@/helpers/apiHelper";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/MultiStepFormContext";

export default function PurchasePage() {
  const { validatedFiles } = useImageValidation();
  const { user } = useAuth();
  const router = useRouter();

  const { setModelId } = useFormContext();

  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [showValidator, setShowValidator] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  const onBuy = (pkg: Package) => {
    setSelectedPkg(pkg);
    // if they've already validated images, go straight to payment
    if (validatedFiles.length >= 8) {
      // Updated to match backend requirement
      startPayment(pkg);
    } else {
      // otherwise, show the validation form
      setShowValidator(true);
    }
  };

  // FIXED: Modified to not automatically close the modal
  const onValidated = (success: boolean) => {
    console.log("Validation result:", success);
    setValidationSuccess(success);
    // We no longer automatically close the dialog or proceed to payment
  };

  // FIXED: Added a new function for proceeding to payment
  const handleProceedToPayment = () => {
    // Only close modal and start payment if validation succeeded
    if (validationSuccess && selectedPkg) {
      setShowValidator(false);
      startPayment(selectedPkg);
    }
  };

  const startPayment = async (pkg: Package) => {
    // generate model_id: <IST-unix-ts>_<first6Email>_<2-digitRandom>
    const now = new Date();
    const utcTs = Math.floor(now.getTime() / 1000);
    const istOffset = 5.5 * 3600;
    const istTs = utcTs + istOffset;
    const first6 = user?.email.substring(0, 6);
    const rand2 = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    const newModelId = `${istTs}_${first6}_${rand2}`;
    setModelId(newModelId);
    // 1) load SDK
    if (!(await loadRazorpay())) {
      alert("Failed to load payment SDK");
      return;
    }

    try {
      // 2) create order
      const order = await apiHelper.post<{
        id: string;
        amount: number;
        currency: string;
        order_id: string;
      }>(
        "/api/payment/create-order",
        {
          user_email: user?.email,
          model_id: newModelId,
          package_name: pkg.package_name,
          amount: pkg.cost,
          currency: "INR",
          payment_mode: "razorpay",
        }
        // { headers: { "X-API-Key": "supersecret123" } }
      );

      // 3) open checkout
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Portrait Pal",
        description: pkg.package_name,
        handler: async (razorpayResponse: any) => {
          // verify
          const orderId = razorpayResponse.razorpay_order_id;
          const paymentId = razorpayResponse.razorpay_payment_id;
          const signature = razorpayResponse.razorpay_signature;
          console.log("orderId : ", orderId);
          console.log("paymentId : ", paymentId);
          console.log("signature : ", signature);
          try {
            await apiHelper.post(
              "/api/payment/verify",
              {
                user_email: user?.email,
                model_id: "model_123",
                order_id: orderId,
                payment_id: paymentId,
                signature,
              }
              // { headers: { "X-API-Key": "supersecret123" } }
            );
            // success → final form
            router.push("/user/headshots/form");
          } catch {
            alert("Payment verification failed.");
          }
        },
        theme: { color: "#007bff" },
      };

      new (window as any).Razorpay(options).open();
    } catch {
      alert("Order creation failed.");
    }
  };

  // FIXED: Modified to prevent automatic closing
  const handleCloseValidator = () => {
    // Only allow closing if validation was successful or if user explicitly cancels
    if (validationSuccess) {
      setShowValidator(false);
    } else {
      console.log("Please complete validation before closing");
      // Optionally you can show an alert or confirmation dialog here
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4} justifyContent="center">
        <PackagesSection
          onBuy={onBuy as any} // pass through to PackageCard
        />
      </Grid>

      {/* FIXED: Updated to use a controlled component pattern */}
      <ImageValidationModal
        open={showValidator}
        onClose={handleCloseValidator}
        onValidated={onValidated}
        onProceedToPayment={handleProceedToPayment}
        minImages={8} // Match backend requirement
      />
    </Container>
  );
}
