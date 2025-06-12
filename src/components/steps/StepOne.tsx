// src/components/steps/StepOne.tsx
"use client";

import { FC } from "react";
import { useRouter } from "next/navigation"; // ← next/navigation, not next/router
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { motion } from "framer-motion";

export const StepOne: FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const goToStep2 = () => {
    // Push exactly ?step=2 on the same path
    router.push("/add?step=2");
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}>
        {["Who", "Package", "Upload", "Finish"].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}

      <Typography variant="h4" align="center" gutterBottom>
        Who do you want to create headshots for?
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={6}>
        Start your own set or set up a team workspace.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardActionArea onClick={goToStep2}>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    color={theme.palette.primary.main}
                  >
                    <PersonIcon fontSize="large" sx={{ mr: 1 }} />
                    <Typography variant="h6">Just for myself</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Get fast, professional headshots you can use anywhere.
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <li>No studio visits needed</li>
                    <li>Done from home or office</li>
                    <li>8× cheaper than in‑person shoots</li>
                  </Box>
                </CardContent>
                <Box textAlign="center" p={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={goToStep2}
                    fullWidth
                  >
                    CREATE HEADSHOTS FOR MYSELF
                  </Button>
                </Box>
              </CardActionArea>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardActionArea onClick={goToStep2}>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    color={theme.palette.primary.main}
                  >
                    <GroupIcon fontSize="large" sx={{ mr: 1 }} />
                    <Typography variant="h6">For my team and me</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Save on corporate headshots without ever leaving the office.
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <li>Easily invite team members</li>
                    <li>Save up to 10× the cost</li>
                    <li>Manage everyone in one app</li>
                  </Box>
                </CardContent>
                <Box textAlign="center" p={2}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={goToStep2}
                    fullWidth
                  >
                    CREATE HEADSHOTS FOR MY TEAM
                  </Button>
                </Box>
              </CardActionArea>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};
