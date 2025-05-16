// File: src/components/UseCases/LegalUseCase.tsx
"use client";

import React from "react";
import { Container, Paper, Box, Typography } from "@mui/material";
// import orig2 from "@/assets/orig2.png";

export default function LegalUseCase() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, background: "#f5f7fa", minHeight: "100vh" }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>
          Legal Professionals
        </Typography>
        <Typography variant="body1" paragraph>
          Project confidence and trustworthiness with a professional portrait.
          Perfect for firm websites, legal directories, and client
          communications.
        </Typography>
        <Box
          component="img"
          // src={orig2.src || orig2}
          alt="Legal Professionals"
          sx={{ width: "100%", borderRadius: 1, mt: 2 }}
        />
      </Paper>
    </Container>
  );
}
