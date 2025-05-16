// File: src/components/UseCases/UseCaseNotFound.tsx
"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function UseCaseNotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Oops!
      </Typography>
      <Typography>
        We couldn’t find a use case matching that ID. Please check the URL.
      </Typography>
    </Container>
  );
}
