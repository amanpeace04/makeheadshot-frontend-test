// File: src/components/ui/PreviousJobs.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import apiHelper from "@/helpers/apiHelper";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Divider,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";

interface JobDetail {
  created_at: number;
  eye_color: string;
  spectacles: string;
  model_id: string;
  package_name: string;
  user_input_images_count: number;
  total_number_output_images: number;
  body_type: string;
  weight: number;
  height: number;
}

export default function PreviousJobs() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const [jobs, setJobs] = useState<JobDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    const safeEmail = encodeURI(user.email);
    apiHelper
      .get<{ user_details: any[] }>(`/api/user/details?email=${safeEmail}`)
      .then((res) => {
        setJobs(res.user_details || []);
        setError(null);
      })
      .catch((e: any) => {
        setError(e.message || "Failed to load previous jobs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  if (authLoading || loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (jobs.length === 0) {
    return <Typography>No previous jobs found.</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {jobs.map((job) => {
        const purchasedOn = new Date(job.created_at * 1000).toLocaleString();
        const headerBg = `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`;

        return (
          <Grid item xs={12} md={6} key={job.model_id}>
            <Card
              elevation={4}
              sx={{
                borderRadius: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardActionArea
                onClick={() =>
                  router.push(
                    `/user/headshots/form?modelID=${encodeURIComponent(
                      job.model_id
                    )}`
                  )
                }
              >
                <CardHeader
                  title={job.package_name || "Package"}
                  subheader={`Purchased on ${purchasedOn}`}
                  sx={{
                    background: headerBg,
                    color: "#fff",
                    textAlign: "center",
                    "& .MuiCardHeader-title": {
                      fontWeight: 700,
                      fontSize: "1.25rem",
                    },
                  }}
                />
                <Divider />

                <CardContent>
                  <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Submitted Images
                      </Typography>
                      <Typography>{job.user_input_images_count}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Generated Images
                      </Typography>
                      <Typography>{job.total_number_output_images}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: "grid", rowGap: 1 }}>
                    <Typography>
                      <strong>Body Type:</strong> {job.body_type}
                    </Typography>
                    <Typography>
                      <strong>Weight:</strong> {job.weight} kg
                    </Typography>
                    <Typography>
                      <strong>Height:</strong> {job.height} cm
                    </Typography>
                    <Typography>
                      <strong>Eye Color:</strong> {job.eye_color}
                    </Typography>
                    <Typography>
                      <strong>Spectacles:</strong> {job.spectacles}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
