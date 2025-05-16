// File: src/app/privacy-policy/page.tsx
"use client";

import React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Link,
  Divider,
} from "@mui/material";

export default function PrivacyPolicyPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, background: "#f5f7fa", minHeight: "100vh" }}
    >
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          Last updated: May 16, 2025
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            1. Introduction
          </Typography>
          <Typography variant="body2">
            Welcome to our AI Headshots service. We respect your privacy and are
            committed to protecting your personal data. This policy explains how
            we collect, use, and safeguard your information.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            2. Information We Collect
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Personal Information:</strong> When you sign up, we collect
            your name, email address, age, gender, and other details you provide
            in the form.
          </Typography>
          <Typography variant="body2">
            <strong>Photos:</strong> We temporarily store the images you upload
            in order to validate face area and generate your AI headshots. These
            images are deleted once your headshots are complete.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            3. How We Use Your Data
          </Typography>
          <Typography variant="body2" paragraph>
            • To validate your uploaded photos (face detection and quality
            checks). • To generate and deliver your AI-enhanced headshots. • To
            communicate with you about your order and answer support inquiries.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            4. Cookies and Tracking
          </Typography>
          <Typography variant="body2">
            We use basic cookies (via Next.js) to keep you signed in and
            maintain session state. No third-party advertising cookies are used.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            5. Data Retention
          </Typography>
          <Typography variant="body2" paragraph>
            Uploaded photos and form responses are retained only as long as
            needed to process and fulfill your order (typically a few days),
            then permanently deleted.
          </Typography>
          <Typography variant="body2">
            We may retain anonymized usage data indefinitely for analytics and
            product improvement.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            6. Security
          </Typography>
          <Typography variant="body2">
            We employ industry-standard security measures (HTTPS, encrypted
            storage) to protect your data. However, no system is completely
            foolproof—please use strong, unique passwords.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            7. Children’s Privacy
          </Typography>
          <Typography variant="body2">
            Our services are intended for users aged 18 and above. We do not
            knowingly collect data from minors.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            8. Changes to This Policy
          </Typography>
          <Typography variant="body2">
            We may update this policy occasionally. The “Last updated” date
            above will reflect any changes.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            Contact Us
          </Typography>
          <Typography variant="body2">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <Link href="mailto:support@yourdomain.com" underline="hover">
              support@yourdomain.com
            </Link>
            .
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
