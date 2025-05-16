// File: src/app/terms-of-service/page.tsx
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

export default function TermsOfServicePage() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 6, background: "#f5f7fa", minHeight: "100vh" }}
    >
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
          Last updated: May 16, 2025
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body2" paragraph>
            By accessing or using our AI Headshots service (the “Service”), you
            agree to be bound by these Terms of Service (the “Terms”). If you do
            not agree to these Terms, you may not use the Service.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            2. Eligibility
          </Typography>
          <Typography variant="body2" paragraph>
            You must be at least 18 years old to use the Service. By agreeing to
            these Terms, you represent and warrant that you are 18 or older.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            3. License to Use
          </Typography>
          <Typography variant="body2" paragraph>
            Subject to your compliance with these Terms, we grant you a limited,
            non-exclusive, non-transferable, revocable license to access and use
            the Service for your personal, non-commercial use.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            4. User Conduct
          </Typography>
          <Typography variant="body2" paragraph>
            You agree not to:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2, mb: 2 }}>
            <Typography component="li">
              Upload any content that is unlawful, harmful, or infringement of
              third-party rights.
            </Typography>
            <Typography component="li">
              Attempt to reverse engineer or tamper with our face-validation
              technology.
            </Typography>
            <Typography component="li">
              Use the Service to create or distribute offensive or abusive
              imagery.
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            5. Intellectual Property
          </Typography>
          <Typography variant="body2" paragraph>
            All content, designs, and materials provided by the Service,
            including the AI-generated headshots, are owned by us or our
            licensors and are protected by copyright, trademark, and other
            intellectual property laws.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            6. Payment and Refunds
          </Typography>
          <Typography variant="body2" paragraph>
            You agree to pay all applicable fees for paid plans or add-ons as
            described at the time of purchase. All payments are non-refundable
            except as required by law.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            7. Disclaimer of Warranties
          </Typography>
          <Typography variant="body2" paragraph>
            The Service is provided “as is” and “as available” without warranty
            of any kind. We disclaim all warranties, express or implied,
            including merchantability, fitness for a particular purpose, and
            non-infringement.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            8. Limitation of Liability
          </Typography>
          <Typography variant="body2" paragraph>
            To the fullest extent permitted by law, in no event will we be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or relating to your use of the
            Service.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            9. Termination
          </Typography>
          <Typography variant="body2" paragraph>
            We may suspend or terminate your access to the Service at any time,
            with or without cause or notice, if you breach these Terms.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            10. Governing Law
          </Typography>
          <Typography variant="body2" paragraph>
            These Terms are governed by and construed in accordance with the
            laws of [Your Jurisdiction], without regard to conflict of law
            provisions.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            11. Changes to These Terms
          </Typography>
          <Typography variant="body2" paragraph>
            We may modify these Terms from time to time. The “Last updated” date
            at the top will reflect any changes. Continued use of the Service
            constitutes acceptance of the new Terms.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            Contact Us
          </Typography>
          <Typography variant="body2">
            If you have questions about these Terms, please contact us at{" "}
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
