"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Box,
  CircularProgress,
  Alert,
  useTheme,
  Snackbar,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { loadFaceModels, validateFaces } from "@/utils/faceValidation";
import { useImageValidation } from "@/context/ImageValidationContext";

type Status = "pending" | "valid" | "invalid" | "duplicate";

interface FileItem {
  file: File;
  id: string;
  status: Status;
  errorMessage?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onValidated: (success: boolean) => void;
  onProceedToPayment?: () => void;
  minImages?: number;
  maxImages?: number;
  minFacePercent?: number;
}

export default function ImageValidationModal({
  open,
  onClose,
  onValidated,
  onProceedToPayment,
  minImages = 8,
  maxImages = 15,
  minFacePercent = 8,
  maxFacePercent = 30,
}: Props) {
  const theme = useTheme();
  const { setValidatedFiles } = useImageValidation();
  const validationInProgress = useRef(false);

  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load face-api.js models on mount
  useEffect(() => {
    loadFaceModels("/models")
      .then(() => setModelsLoaded(true))
      .catch(console.error);
  }, []);

  // Handle file drop, add as pending or duplicate
  const onDrop = useCallback(
    (accepted: File[]) => {
      setError(null);
      if (items.length + accepted.length > maxImages) {
        setError(`Maximum ${maxImages} images allowed.`);
        return;
      }

      setItems((prev) => {
        const newItems = [...prev];
        const hashes = new Set(prev.map((i) => i.file.name + i.file.size));
        accepted.forEach((file) => {
          const key = file.name + file.size;
          if (hashes.has(key)) {
            newItems.push({ file, id: key + Date.now(), status: "duplicate" });
          } else {
            hashes.add(key);
            newItems.push({ file, id: key + Date.now(), status: "pending" });
          }
        });
        return newItems;
      });
    },
    [items, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleCameraUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.capture = "environment";
    input.onchange = (e: any) => {
      if (e.target.files?.length) {
        onDrop(Array.from(e.target.files));
      }
    };
    input.click();
  };

  // Run face validation and update statuses
  const handleVerify = async () => {
    if (validationInProgress.current) return;
    validationInProgress.current = true;

    if (!modelsLoaded) {
      setLoading(true);
      await loadFaceModels("/models");
      setModelsLoaded(true);
      setLoading(false);
    }

    const validItems = items.filter((i) => i.status !== "duplicate");
    if (validItems.length < minImages) {
      setError(`Please upload at least ${minImages} unique images.`);
      onValidated(false);
      validationInProgress.current = false;
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const files = validItems.map((i) => i.file);
      const res = await validateFaces(files, minFacePercent, maxFacePercent);

      const validSet = new Set(res.valid);
      setItems((prev) =>
        prev.map((item) => {
          if (item.status === "duplicate") return item;

          const fileDetail = res.details.find(
            (d) => d.filename === item.file.name
          );

          if (validSet.has(item.file.name)) {
            return { ...item, status: "valid" };
          }

          let errorMessage = `Face < ${minFacePercent}%`;
          if (fileDetail?.face_percent > maxFacePercent) {
            errorMessage = `Face > ${maxFacePercent}%`;
          }

          return {
            ...item,
            status: "invalid",
            errorMessage,
          };
        })
      );

      // Collect validated files
      const validatedFiles = files.filter((f) => validSet.has(f.name));
      setValidatedFiles(validatedFiles);

      const count = res.valid_count;
      if (count >= minImages) {
        setSuccessMessage(`${count} images verified!`);
        setSuccess(true);
        onValidated(true);
      } else {
        setError(`Need ${minImages} valid images, but got ${count}.`);
        onValidated(false);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Verification failed.");
      onValidated(false);
    } finally {
      setLoading(false);
      validationInProgress.current = false;
    }
  };

  const handleRemove = (id: string) => () => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Counts for UI
  const validCount = items.filter((i) => i.status === "valid").length;
  const nonDupCount = items.filter((i) => i.status !== "duplicate").length;

  // Prevent closing while loading
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        disableEscapeKeyDown={loading}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(to right, #1e4d8c, #00a99d)",
            color: "white",
            p: 2,
          }}
        >
          <Typography variant="h5">
            Select Images for Your AI Headshots
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Please select {minImages}–{maxImages} images(each between{" "}
            {minFacePercent}% and {maxFacePercent}% face area)
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              px: 4,
              py: 6,
              mb: 3,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": { borderColor: "#00a99d" },
            }}
          >
            <input {...getInputProps()} />
            <Typography>
              {isDragActive
                ? "Drop here…"
                : `Click or drag to select (${nonDupCount} of ${minImages})`}
            </Typography>
          </Box>

          <Box textAlign="center" mb={3}>
            <Button
              variant="outlined"
              onClick={handleCameraUpload}
              startIcon={<CameraAltIcon />}
            >
              Use Camera
            </Button>
          </Box>

          <Grid container spacing={2}>
            {items.map((item) => {
              const borderColor =
                item.status === "valid"
                  ? "#00a99d"
                  : item.status === "invalid"
                  ? theme.palette.error.main
                  : item.status === "duplicate"
                  ? "orange"
                  : "transparent";

              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card
                      sx={{
                        border: `2px solid ${borderColor}`,
                        position: "relative",
                      }}
                      elevation={2}
                    >
                      {item.status === "valid" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bgcolor: "rgba(0,169,157,0.7)",
                            p: 0.5,
                            borderBottomLeftRadius: 8,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{ color: "white", fontSize: 16 }}
                          />
                        </Box>
                      )}
                      {item.status === "invalid" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bgcolor: "rgba(211,47,47,0.7)",
                            p: 0.5,
                            borderBottomLeftRadius: 8,
                          }}
                        >
                          <ErrorIcon sx={{ color: "white", fontSize: 16 }} />
                        </Box>
                      )}
                      {item.status === "duplicate" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bgcolor: "rgba(255,165,0,0.7)",
                            p: 0.5,
                            borderBottomLeftRadius: 8,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "white" }}>
                            Dup
                          </Typography>
                        </Box>
                      )}

                      <CardMedia
                        component="img"
                        image={URL.createObjectURL(item.file)}
                        alt={item.file.name}
                        sx={{
                          height: 120,
                          objectFit: "cover",
                          opacity: item.status === "duplicate" ? 0.6 : 1,
                        }}
                      />

                      {item.errorMessage && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 40,
                            left: 0,
                            right: 0,
                            bgcolor: "rgba(211,47,47,0.7)",
                            p: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            {item.errorMessage}
                          </Typography>
                        </Box>
                      )}

                      <CardActions sx={{ justifyContent: "center", p: 1 }}>
                        <IconButton
                          size="small"
                          onClick={handleRemove(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setItems([])}
            disabled={loading || !items.length}
            sx={{ color: "text.secondary" }}
          >
            Remove All
          </Button>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>

          {onProceedToPayment ? (
            // ─── Multi-step form flow ──────────────────────────────
            success && validCount >= minImages ? (
              <Button
                variant="contained"
                onClick={onProceedToPayment}
                sx={{
                  background: "linear-gradient(to right, #1e4d8c, #00a99d)",
                  color: "white",
                }}
              >
                Proceed to Payment
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleVerify}
                disabled={!modelsLoaded || loading || nonDupCount < minImages}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {!modelsLoaded
                  ? "Loading models…"
                  : loading
                  ? "Verifying…"
                  : "Verify Images"}
              </Button>
            )
          ) : // ─── FinalPreview flow ─────────────────────────────────
          success && validCount >= minImages ? (
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                background: "linear-gradient(to right, #1e4d8c, #00a99d)",
                color: "white",
              }}
            >
              Done
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleVerify}
              disabled={!modelsLoaded || loading || nonDupCount < minImages}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {!modelsLoaded
                ? "Loading models…"
                : loading
                ? "Verifying…"
                : "Verify Images"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={60000}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": { bgcolor: "#00a99d", color: "white" },
        }}
      />
    </>
  );
}
