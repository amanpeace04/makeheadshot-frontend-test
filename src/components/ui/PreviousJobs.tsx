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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ImageList,
  ImageListItem,
  Chip,
  IconButton,
} from "@mui/material";
import { Download } from "@mui/icons-material";

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
  completed_jobs?: number;
}

interface JobStatusData {
  model_id: string;
  task_status: string;
  processing_type: string;
  name: string;
  email_id: string;
  created_at: number;
  last_updated: number;
  total_jobs: number;
  completed_jobs: number;
  total_images_planned: number;
  completed_images: number;
  progress_percentage: number;
}

interface JobImage {
  image_id: string;
  image_url: string;
  generated_at: string;
  status: string;
  presigned_url: string;
}

interface JobCombination {
  combo_id: string;
  clothing: string;
  background: string;
  status: string;
  job_uid: string;
  images: JobImage[];
}

interface JobImagesData {
  model_id: string;
  total_images: number;
  combinations: JobCombination[];
}

interface JobWithStatus extends JobDetail {
  status?: string;
  statusLoading?: boolean;
  completed_jobs?: number;
}

export default function PreviousJobs() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const [jobs, setJobs] = useState<JobWithStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openModalJobId, setOpenModalJobId] = useState<string | null>(null);
  const [jobImages, setJobImages] = useState<JobImagesData | null>(null);
  const [imagesLoading, setImagesLoading] = useState(false);

  const API_KEY = "supersecret123";

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    const safeEmail = encodeURI(user.email);
    apiHelper
      .get<{ user_details: any[] }>(`/api/user/details?email=${safeEmail}`)
      .then((res) => {
        const jobsData = res.user_details || [];

        setJobs(jobsData.map((job) => ({ ...job, statusLoading: true })));
        setError(null);
        // Fetch status for each job
        jobsData.forEach((job) => {
          fetchJobStatus(job.model_id);
        });
      })
      .catch((e: any) => {
        setError(e.message || "Failed to load previous jobs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  const fetchJobStatus = async (modelId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/status/${modelId}`,
        {
          headers: {
            "X-API-Key": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }

      const statusData: JobStatusData = await response.json();

      // Update the specific job's status
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.model_id === modelId
            ? {
                ...job,
                status: statusData.task_status,
                statusLoading: false,
                completed_jobs: statusData.completed_jobs,
              }
            : job
        )
      );
    } catch (err: any) {
      // Update job to show error state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.model_id === modelId
            ? { ...job, status: "error", statusLoading: false }
            : job
        )
      );
    }
  };

  const fetchJobImages = async (modelId: string) => {
    try {
      setImagesLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/images/${modelId}?presigned=true`,
        {
          headers: {
            "X-API-Key": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data: JobImagesData = await response.json();
      setJobImages(data);
    } catch (err: any) {
      console.error("Error fetching job images:", err);
      setJobImages(null);
    } finally {
      setImagesLoading(false);
    }
  };

  const handleOpenModal = async (modelId: string) => {
    setOpenModalJobId(modelId);
    await fetchJobImages(modelId);
  };

  const handleCloseModal = () => {
    setOpenModalJobId(null);
    setJobImages(null);
  };

  const handleDownloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
      case "generating":
      case "training":
        return "warning";
      case "pending":
      case "queued":
      case "model_ready":
        return "info";
      case "failed":
      case "error":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "queued":
        return "Queued";
      case "training":
        return "Training";
      case "model_ready":
        return "Model Ready";
      case "generating":
        return "Generating";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  // Get all images from combinations for modal display
  const getAllJobImages = () => {
    if (!jobImages) return [];
    return jobImages.combinations.flatMap((combo) =>
      combo.images.map((img) => ({
        url: img.presigned_url,
        combo: combo.combo_id,
        clothing: combo.clothing,
        background: combo.background,
        imageId: img.image_id,
      }))
    );
  };

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
    <Box sx={{ pb: 6 }}>
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
                    {/* Status Display */}
                    <Box
                      sx={{ mb: 2, display: "flex", justifyContent: "center" }}
                    >
                      {job.statusLoading ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CircularProgress size={16} />
                          <Typography variant="body2">
                            Loading status...
                          </Typography>
                        </Box>
                      ) : (
                        <Chip
                          label={
                            job.status ? getStatusText(job.status) : "Unknown"
                          }
                          color={
                            job.status
                              ? (getStatusColor(job.status) as any)
                              : "default"
                          }
                          variant="filled"
                          size="small"
                        />
                      )}
                    </Box>

                    <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Submitted Images
                        </Typography>
                        <Typography>
                          {job.user_input_images_count}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Generated Images
                        </Typography>
                        <Typography>{job.completed_jobs}</Typography>
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

                    {/* Show View Images button if status is completed and has images */}
                    {job.status === "completed" && job.completed_jobs > 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          mt: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: 2,
                          borderRadius: 2,
                          letterSpacing: 0.5,
                          fontSize: "1rem",
                          transition: "background 0.2s",
                          "&:hover": {
                            background: theme.palette.primary.dark,
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(job.model_id);
                        }}
                        startIcon={
                          <svg
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM5 5h14v14H5V5Zm7 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                            />
                          </svg>
                        }
                      >
                        View & Download Images
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        disabled
                        sx={{
                          mt: 2,
                          fontWeight: 600,
                          borderRadius: 2,
                          fontSize: "0.7rem",
                          letterSpacing: 0.5,
                          cursor: "not-allowed",
                          color: "#040404",
                          "&.Mui-disabled": {
                            color: "#040404",
                          },
                        }}
                      >
                        {job.status === "processing"
                          ? "Images are being generated..."
                          : job.status === "failed" || job.status === "error"
                          ? "Generation failed"
                          : "Images will appear here once generated"}
                      </Button>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Modal for viewing images */}
      <Dialog
        open={!!openModalJobId}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Generated Images</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {jobImages ? `${getAllJobImages().length} images` : ""}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {imagesLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : jobImages && getAllJobImages().length > 0 ? (
            <ImageList cols={3} gap={16}>
              {getAllJobImages().map((imgData, idx) => (
                <ImageListItem key={idx} sx={{ position: "relative" }}>
                  <img
                    src={imgData.url}
                    alt={`${imgData.clothing} - ${imgData.background}`}
                    style={{ width: "100%", borderRadius: 8 }}
                    loading="lazy"
                  />

                  {/* Download Button */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.7)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.9)",
                      },
                    }}
                    onClick={() =>
                      handleDownloadImage(
                        imgData.url,
                        `${imgData.clothing}_${imgData.background}_${imgData.imageId}.jpg`
                      )
                    }
                  >
                    <Download fontSize="small" />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography>No images found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
