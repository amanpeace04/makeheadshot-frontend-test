// File: src/components/UseCases/CorporateUseCase.tsx
"use client";

import React from "react";
import { Container, Paper, Box, Typography } from "@mui/material";
// import ai1 from "@/assets/ai1.png"; // adjust path as needed

export default function CorporateUseCase() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, background: "#f5f7fa", minHeight: "100vh" }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>
          Corporate Professionals
        </Typography>
        <Typography variant="body1" paragraph>
          Optimize your LinkedIn profile with a studio-grade picture. Align with
          platform standards to boost your professional visibility and network
          impact.
        </Typography>
        <Box
          component="img"
          // src={ai1.src || ai1}
          alt="Corporate Professionals"
          sx={{ width: "100%", borderRadius: 1, mt: 2 }}
        />
      </Paper>
    </Container>
  );
}
