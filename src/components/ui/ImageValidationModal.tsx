"use client";

import React, { useState, useCallback, ChangeEvent } from "react";
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
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import apiHelper from "@/helpers/apiHelper";
import { useImageValidation } from "@/context/ImageValidationContext";

type Status = "pending" | "valid" | "invalid";

interface FileItem {
  file: File;
  id: string;
  status: Status;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onValidated: () => void;
  minImages?: number;
  maxImages?: number;
  minFacePercent?: number;
}

export default function ImageValidationModal({
  open,
  onClose,
  onValidated,
  minImages = 10,
  maxImages = 15,
  minFacePercent = 8,
}: Props) {
  const theme = useTheme();
  const { setValidatedFiles } = useImageValidation();

  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Append new uploads rather than replace
  const onDrop = useCallback(
    (accepted: File[]) => {
      setError(null);
      if (items.length + accepted.length > maxImages) {
        setError(`Max ${maxImages} images allowed.`);
        return;
      }
      const wrapped = accepted.map((file, idx) => ({
        file,
        id: `${file.name}-${Date.now()}-${idx}`,
        status: "pending" as Status,
      }));
      setItems((prev) => [...prev, ...wrapped]);
    },
    [maxImages, items]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Trigger validation
  const handleValidate = async () => {
    if (items.length < minImages) {
      setError(`Please upload at least ${minImages} images.`);
      return;
    }
    setLoading(true);
    setError(null);
    const form = new FormData();
    form.append("min_valid_faces", String(minFacePercent));
    items.forEach((i) => form.append("files", i.file, i.file.name));

    try {
      const res = await apiHelper.post<{
        status: string;
        details: Array<{
          filename: string;
          face_percent?: number;
          error?: string;
        }>;
      }>("/api/validate-faces", form, {
        headers: { "X-API-Key": "supersecret123" },
      });

      const detailMap: Record<string, boolean> = {};
      res.details.forEach((d) => {
        detailMap[d.filename] = (d.face_percent ?? 0) >= minFacePercent;
      });

      const updated = items.map((item) => ({
        ...item,
        status: detailMap[item.file.name] ? "valid" : "invalid",
      }));
      setItems(updated);

      if (!updated.some((i) => i.status === "invalid")) {
        setValidatedFiles(updated.map((i) => i.file));
        onValidated();
      }
    } catch (e: any) {
      setError(e.message || "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  // Remove single file
  const handleRemove = (id: string) => () =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const hasInvalid = items.some((i) => i.status === "invalid");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Typography variant="h5">Step 1: Upload & Validate Selfies</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Upload {minImages}–{maxImages} images (≥{minFacePercent}% face).
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
            borderColor: isDragActive
              ? theme.palette.primary.main
              : theme.palette.divider,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            bgcolor: isDragActive ? theme.palette.action.hover : "transparent",
            mb: 3,
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            {isDragActive
              ? "Drop images here…"
              : `Click or drag to select images (you’ve selected ${items.length})`}
          </Typography>
        </Box>

        {/* Pending uploads */}
        {items.some((i) => i.status === "pending") && (
          <Grid container spacing={2}>
            {items
              .filter((i) => i.status === "pending")
              .map((item) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card sx={{ width: 140 }} elevation={3}>
                      <CardMedia
                        component="img"
                        sx={{ width: "100%", height: 100, objectFit: "cover" }}
                        image={URL.createObjectURL(item.file)}
                        alt={item.file.name}
                      />
                      <CardActions sx={{ justifyContent: "center", p: 1 }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={handleRemove(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        )}

        {/* Validated: Successful */}
        {items.some((i) => i.status === "valid") && (
          <>
            <Typography variant="subtitle2" color="success.main" sx={{ mt: 2 }}>
              Valid Images
            </Typography>
            <Grid container spacing={2}>
              {items
                .filter((i) => i.status === "valid")
                .map((item) => (
                  <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Card
                        sx={{
                          width: 140,
                          border: `2px solid ${theme.palette.success.main}`,
                        }}
                        elevation={3}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100%",
                            height: 100,
                            objectFit: "cover",
                          }}
                          image={URL.createObjectURL(item.file)}
                          alt={item.file.name}
                        />
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
            </Grid>
          </>
        )}

        {/* Validated: Failed */}
        {items.some((i) => i.status === "invalid") && (
          <>
            <Typography variant="subtitle2" color="error.main" sx={{ mt: 2 }}>
              Invalid Images
            </Typography>
            <Grid container spacing={2}>
              {items
                .filter((i) => i.status === "invalid")
                .map((item) => (
                  <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Card
                        sx={{
                          width: 140,
                          border: `2px solid ${theme.palette.error.main}`,
                        }}
                        elevation={3}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100%",
                            height: 100,
                            objectFit: "cover",
                          }}
                          image={URL.createObjectURL(item.file)}
                          alt={item.file.name}
                        />
                        <CardActions sx={{ justifyContent: "center", p: 1 }}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={handleRemove(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={() => {
            setItems([]);
            setError(null);
          }}
          disabled={loading || items.length === 0}
        >
          Remove All
        </Button>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleValidate}
          disabled={loading || items.length < minImages || hasInvalid}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Validating…" : "Validate Images"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
