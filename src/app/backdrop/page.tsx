"use client";

import React from "react";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroSection() {
  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <Box sx={{ py: 8, px: 4, bgcolor: "#f9f9fb" }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left: Video Hero */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div initial="hidden" animate="visible" variants={slideInLeft}>
            <Box
              component="video"
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                objectFit: "cover",
                maxHeight: 500,
              }}
            />
          </motion.div>
        </Grid>

        {/* Right: Promotional Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            <Stack spacing={3}>
              <Typography variant="h3" fontWeight={700}>
                Pick your backdrop and outfit from a wide range of options
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose the location of your shoot and pick an outfit from a wide
                range of options. You&apos;ll get 10 headshots per combination,
                to make sure you get the perfect shot.
              </Typography>

              {/* Thumbnail composite example */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  component="img"
                  src="/images/sample-person.jpg"
                  alt="Sample"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                />
                <Typography variant="h4" color="primary">
                  +
                </Typography>
                <Box
                  component="img"
                  src="/images/sample-backdrop.jpg"
                  alt="Backdrop"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                />
                <Typography variant="h4" color="primary">
                  =
                </Typography>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    backgroundImage: "url(/images/sample-result.jpg)",
                    backgroundSize: "cover",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                />
              </Stack>

              <Button
                variant="contained"
                size="large"
                sx={{
                  alignSelf: "start",
                  bgcolor: "#ff5722",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#e64a19" },
                }}
              >
                Start your photo shoot
              </Button>
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
