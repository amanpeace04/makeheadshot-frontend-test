// components/PackageCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import apiHelper from "@/helpers/apiHelper";
import { useAuth } from "@/context/AuthContext";
import { loadRazorpay } from "@/lib/loadRazorpay";

export type Package = {
  outfits: number;
  cost: number; // in paise
  custom_credits: number;
  backgrounds: number;
  package_name: string;
  headshots: number;
  description: string;
  styles: number;
  delivery_hours: number;
};

interface PackageCardProps {
  pkg: Package;
  index: number;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, index }) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const priceLabel = (pkg.cost / 100).toFixed(0);

  const handleBuy = async () => {
    // load Razorpay SDK
    if (!(await loadRazorpay())) {
      alert("Unable to load payment SDK");
      return;
    }

    try {
      // 1) create order
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

      // 2) open checkout
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Portrait Pal",
        description: `Purchase ${pkg.package_name}`,
        order_id: order.id,
        // inside your Razorpay handler...
        handler: async (razorpayResponse: any) => {
          console.log("🔔 Razorpay response:", razorpayResponse);
          // razorpayResponse should have:
          //   razorpay_payment_id, razorpay_order_id, razorpay_signature

          const orderId =
            razorpayResponse.razorpay_order_id ?? razorpayResponse.order_id;
          const paymentId = razorpayResponse.razorpay_payment_id;
          const signature =
            razorpayResponse.razorpay_signature ?? razorpayResponse.signature;

          if (!orderId || !paymentId || !signature) {
            console.error("Missing fields in Razorpay response:", {
              orderId,
              paymentId,
              signature,
            });
            alert(
              "Payment succeeded but we didn’t get the order_id or signature back. Please contact support."
            );
            return;
          }

          try {
            await apiHelper.post(
              "/api/payment/verify",
              {
                user_email: user?.email,
                model_id: "model_123",
                order_id: orderId,
                payment_id: paymentId,
                signature: signature,
              },
              { headers: { "X-API-Key": "supersecret123" } }
            );
            // on success:
            router.push("/form");
          } catch (verifyErr: any) {
            console.error("❌ Verify call failed:", verifyErr);
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: { color: "#007bff" },
      };

      const rz = new (window as any).Razorpay(options);
      rz.open();
    } catch (err: any) {
      console.error("Order creation failed", err);
      alert("Could not initiate payment. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": { boxShadow: `0 8px 20px ${theme.palette.grey[400]}` },
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <Typography variant="h6">{pkg.package_name}</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, my: 1 }}>
            ₹{priceLabel}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, px: 2 }}
          >
            {pkg.description}
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {[
              `${pkg.headshots} headshots`,
              `${pkg.styles} styles`,
              `${pkg.backgrounds} backgrounds`,
              `${pkg.outfits} outfits`,
              `${pkg.custom_credits} custom credits`,
              `${pkg.delivery_hours}-hour delivery`,
            ].map((line) => (
              <Typography
                component="li"
                variant="subtitle2"
                key={line}
                sx={{ mb: 0.5 }}
              >
                {line}
              </Typography>
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontWeight: 600 }}
            onClick={handleBuy}
          >
            Buy {pkg.package_name}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
