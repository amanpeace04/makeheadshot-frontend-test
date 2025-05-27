"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/User/Header";
import PreviousJobs from "@/components/ui/PreviousJobs";

export default function UserInfoPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          User not logged in or user info not available.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            background: "linear-gradient(to bottom right, #f9f9f9, #ffffff)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user.picture_url || undefined}
              alt={user.name}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                border: "3px solid #3f51b5",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: "#3f51b5",
                mb: 3,
              }}
            >
              User Profile
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <InfoItem label="Name" value={user.name || "N/A"} />
            <Divider sx={{ my: 1 }} />
            <InfoItem label="Email" value={user.email || "N/A"} />
            <Divider sx={{ my: 1 }} />
            <InfoItem label="Provider" value={user.provider || "N/A"} />
          </Box>
        </Paper>

        <Box mt={8}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Previous Jobs
          </Typography>
          <PreviousJobs />
        </Box>
      </Container>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, color: "text.secondary" }}
      >
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.primary" }}>
        {value}
      </Typography>
    </Box>
  );
}
