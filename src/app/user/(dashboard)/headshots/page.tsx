// app/purchase/page.tsx  (or wherever you render it)
"use client";

import React, { useState } from "react";
import { Container, Grid, Box, Modal } from "@mui/material";
import PackagesSection from "@/components//ui/PurchaseSection";
import { Package } from "@/components/ui/PackageCard";
import ImageValidationForm from "@/components/ui/ImageValidationModal";
import { useImageValidation } from "@/context/ImageValidationContext";
import { useAuth } from "@/context/AuthContext";
import { loadRazorpay } from "@/lib/loadRazorpay";
import apiHelper from "@/helpers/apiHelper";
import { useRouter } from "next/navigation";

export default function PurchasePage() {
  const { validatedFiles } = useImageValidation();
  const { user } = useAuth();
  const router = useRouter();

  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [showValidator, setShowValidator] = useState(false);

  const onBuy = (pkg: Package) => {
    setSelectedPkg(pkg);
    // if they’ve already validated images, go straight to payment
    if (validatedFiles.length >= 10) {
      startPayment(pkg);
    } else {
      // otherwise, show the validation form
      setShowValidator(true);
    }
  };

  const onValidated = () => {
    setShowValidator(false);
    if (selectedPkg) startPayment(selectedPkg);
  };

  const startPayment = async (pkg: Package) => {
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

      // 3) open checkout
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Portrait Pal",
        description: pkg.package_name,
        handler: async (razorpayResponse: any) => {
          // verify
          const orderId = razorpayResponse.razorpay_order_id;
          const paymentId = razorpayResponse.razorpay_payment_id;
          const signature = razorpayResponse.razorpay_signature;

          try {
            await apiHelper.post(
              "/api/payment/verify",
              {
                user_email: user?.email,
                model_id: "model_123",
                order_id: orderId,
                payment_id: paymentId,
                signature,
              },
              { headers: { "X-API-Key": "supersecret123" } }
            );
            // success → final form
            router.push("/form");
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

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4} justifyContent="center">
        <PackagesSection
          onBuy={onBuy as any} // pass through to PackageCard
        />
      </Grid>

      <Modal
        open={showValidator}
        onClose={() => setShowValidator(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: "90%",
          }}
        >
          <ImageValidationForm onValidated={onValidated} />
        </Box>
      </Modal>
    </Container>
  );
}
