// src/components/steps/StepTwo.tsx
"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";

interface Plan {
  key: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    key: "basic",
    title: "Basic",
    price: "$29",
    description: "Get 40 headshots with 4 unique backdrops.",
    features: [
      "3h turnaround",
      "40 headshots",
      "4 backdrops",
      "4 outfits",
      "4 edit credits",
    ],
    cta: "Get 40 headshots in 3 hours",
  },
  {
    key: "professional",
    title: "Professional",
    price: "$39",
    description: "Get 100 headshots with 10 unique backdrops.",
    features: [
      "2h turnaround",
      "100 headshots",
      "10 backdrops",
      "10 outfits",
      "10 edit credits",
    ],
    highlight: true,
    cta: "Get 100 headshots in 2 hours",
  },
  {
    key: "executive",
    title: "Executive",
    price: "$59",
    description: "Get 200 headshots with 20 unique backdrops.",
    features: [
      "1h turnaround",
      "200 headshots",
      "20 backdrops",
      "20 outfits",
      "20 edit credits",
    ],
    cta: "Get 200 headshots in 1 hour",
  },
];

export const StepTwo: FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleSelect = (key: string) => {
    // dummy next‑step
    router.push(`/app/add?step=3&plan=${key}`);
  };

  // Framer‑Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const card = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, position: "relative" }}>
      {/* Decorative arrow */}
      <Box
        component={FiArrowDownRight}
        sx={{
          position: "absolute",
          top: 32,
          right: 32,
          fontSize: 48,
          color: theme.palette.primary.light,
          transform: "rotate(20deg)",
          opacity: 0.3,
        }}
      />

      {/* Gradient Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Select your package
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={6}>
        One‑time payment, no subscriptions, 100% money‑back guarantee.
      </Typography>

      <Grid
        component={motion.div}
        container
        spacing={4}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.key}>
            <motion.div
              variants={card}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                  border: plan.highlight
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                  position: "relative",
                  backgroundColor: "#fff",
                }}
              >
                {plan.highlight && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: theme.palette.primary.main,
                      color: "#fff",
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )}

                <Typography variant="subtitle1">{plan.title}</Typography>
                <Typography variant="h3" sx={{ my: 1 }}>
                  {plan.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {plan.description}
                </Typography>

                <Box component="ul" sx={{ pl: 2, m: 0, mb: 3 }}>
                  {plan.features.map((f) => (
                    <Box
                      component="li"
                      key={f}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <FaCheck
                        style={{
                          color: theme.palette.primary.main,
                          marginRight: 8,
                        }}
                      />
                      <Typography variant="body2">{f}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant={plan.highlight ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  onClick={() => handleSelect(plan.key)}
                  sx={{ textTransform: "none", py: 1.5 }}
                >
                  {plan.cta}
                </Button>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
