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
import apiHelper from "@/helpers/apiHelper";
import { useImageValidation } from "@/context/ImageValidationContext";

type Status = "pending" | "valid" | "invalid" | "duplicate";

interface FileItem {
  file: File;
  id: string;
  status: Status;
  hash?: string; // For duplicate detection
  errorMessage?: string; // For storing specific error messages
}

interface Props {
  open: boolean;
  onClose: () => void;
  /** callback receives success flag */
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
}: Props) {
  const theme = useTheme();
  const { setValidatedFiles } = useImageValidation();
  // Using a ref to prevent multiple validation calls
  const validationInProgress = useRef(false);

  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationAttempted, setValidationAttempted] = useState(false);

  
  // Generate a simple hash for an image file to detect duplicates
  const generateImageHash = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result;
        if (buffer) {
          // Simple size + first few bytes as hash
          const hash = `${file.size}-${file.name}-${file.lastModified}`;
          resolve(hash);
        } else {
          resolve(`${file.size}-${file.name}-${file.lastModified}`);
        }
      };
      reader.readAsArrayBuffer(file.slice(0, 8192)); // Read first 8KB for hash
    });
  };

  // Append new uploads rather than replace
  const onDrop = useCallback(
    async (accepted: File[]) => {
      setError(null);
      if (items.length + accepted.length > maxImages) {
        setError(`Maximum ${maxImages} images allowed.`);
        return;
      }

      const newItems: FileItem[] = [];
      const existingHashes = items.map((item) => item.hash);

      for (const file of accepted) {
        const hash = await generateImageHash(file);
        
        // Check for duplicates
        if (existingHashes.includes(hash)) {
          newItems.push({
            file,
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            status: "duplicate",
            hash,
          });
        } else {
          newItems.push({
            file,
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            status: "pending",
            hash,
          });
          existingHashes.push(hash);
        }
      }

      setItems((prev) => [...prev, ...newItems]);
      // Reset validation state when new images are added
// Only reset validation state when new images are added if we don't already have enough valid images
if (validationAttempted) {
  const validCount = items.filter(i => i.status === "valid").length;
  if (validCount < minImages) {
    setValidationAttempted(false);
    setSuccess(false); // Clear success state
    setError(null); // Clear any error messages
  }
}
    },
    [maxImages, items, validationAttempted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  /**
   * Verify images and notify parent of overall success.
   */
  const handleVerify = async () => {
    // Prevent multiple validation attempts
    if (validationInProgress.current) return;
    validationInProgress.current = true;
    
    // Filter out duplicates
    const validItems = items.filter((item) => item.status !== "duplicate");
    
    if (validItems.length < minImages) {
      setError(`Please upload at least ${minImages} unique images.`);
      onValidated(false);
      validationInProgress.current = false;
      return;
    }

    setLoading(true);
    setError(null);
    setValidationAttempted(true);

    const form = new FormData();
    form.append("min_valid_faces", String(minFacePercent));
    validItems.forEach((i) => form.append("files", i.file, i.file.name));

    try {
      const res = await apiHelper.post<{
        status: string;
        error?: string;
        message?: string;
        details?: Array<{ filename: string; face_percent?: number; error?: string; message?: string }>;
        valid?: string[];
        valid_count?: number;
        required?: number;
      }>("/api/validate-faces", form, {
        headers: { "X-API-Key": "supersecret123" },
      });

      console.log("Validation response:", res);

      // Create a map of the filenames being validated in this request
      const validatedFilenamesMap: Record<string, boolean> = {};
      validItems.forEach(item => {
        validatedFilenamesMap[item.file.name] = true;
      });

      // API-level success: all images valid
      if (res.status === "success") {
        // Create a map of valid filenames from the backend response
        const validFilenamesMap: Record<string, boolean> = {};
        if (res.valid) {
          res.valid.forEach(filename => {
            validFilenamesMap[filename] = true;
          });
        }
        
        // Only update status for images that were part of this validation request
        setItems((prev) => 
          prev.map(item => {
            if (item.status === "duplicate") return item;
            // Only update status if this file was included in the current validation request
            if (validatedFilenamesMap[item.file.name]) {
              if (validFilenamesMap[item.file.name]) {
                return {...item, status: "valid"};
              } else {
                // This shouldn't happen in success case, but handle it anyway
                return {...item, status: "invalid", errorMessage: "Failed validation"};
              }
            }
            return item; // Keep previous status for non-validated images
          })
        );
        
        // Only set the validated files that are actually valid
        const validFiles = items
          .filter(item => item.status === "valid" || (validatedFilenamesMap[item.file.name] && validFilenamesMap[item.file.name]))
          .map(item => item.file);
        
        setValidatedFiles(validFiles);
        setSuccessMessage("All images have been successfully verified! You can now proceed to payment.");
        setSuccess(true);
        onValidated(true);
        validationInProgress.current = false;
        return;
      }

      // ERROR CASE: Handle specific invalid images
      if (res.status === "error" && res.valid && res.details) {
        // Create a map of valid filenames for quick lookup
        const validFilenamesMap: Record<string, boolean> = {};
        res.valid.forEach(filename => {
          validFilenamesMap[filename] = true;
        });

        // Create a map of error details by filename
        const errorDetailsMap: Record<string, { error: string, message?: string, face_percent?: number }> = {};
        res.details.forEach(detail => {
          if (detail.filename) {
            errorDetailsMap[detail.filename] = {
              error: detail.error || 'unknown_error',
              message: detail.message,
              face_percent: detail.face_percent
            };
          }
        });

        console.log("Valid filenames:", validFilenamesMap);
        console.log("Error details:", errorDetailsMap);
        console.log("Current items:", items.map(i => ({ name: i.file.name, status: i.status })));

        // Update the status of each item based on validation results
        const updated = items.map(item => {
          if (item.status === "duplicate") return item;
          
          const filename = item.file.name;
          
          // Only update status for files that were part of this validation request
          if (validatedFilenamesMap[filename]) {
            // Check if this file is in the valid files list
            if (validFilenamesMap[filename]) {
              return { ...item, status: "valid" };
            } else {
              // Check if we have specific error details for this file
              const errorDetail = errorDetailsMap[filename];
              let errorMessage = "Invalid image";
              
              if (errorDetail) {
                if (errorDetail.error === 'no_face_detected') {
                  errorMessage = "No face detected";
                } else if (errorDetail.error === 'face_size_out_of_range' && errorDetail.message === 'too_small') {
                  errorMessage = `Face too small (${errorDetail.face_percent?.toFixed(1)}%)`;
                } else {
                  errorMessage = errorDetail.message || errorDetail.error;
                }
              }
              
              return { ...item, status: "invalid", errorMessage };
            }
          }
          
          // Keep previous status for items not included in this validation
          return item;
        });
        
        console.log("Updated items:", updated.map(i => ({ name: i.file.name, status: i.status })));
        setItems(updated);

        // Check if we have enough valid images
        const validCount = updated.filter(i => i.status === "valid").length;
        const requiredCount = res.required || minImages;
        
        if (validCount >= requiredCount) {
          // If we have enough valid images, remove all invalid/pending ones
          const validFiles = updated.filter(i => i.status === "valid").map(i => i.file);
          setValidatedFiles(validFiles);
          
          // Only keep valid and duplicate images, remove pending and invalid
          setItems(updated.filter(i => i.status === "valid" || i.status === "duplicate"));
          
          setSuccessMessage(`${validCount} images have been successfully verified! You can now proceed to payment.`);
          setSuccess(true);
          onValidated(true);
        } else {
          setError(`We need at least ${requiredCount} valid images, but only ${validCount} are valid. Please replace the invalid images.`);
          onValidated(false);
        }
      } else {
        // Fallback for unexpected API response format
        console.error("Unexpected API response format:", res);
        setError("Verification failed due to an unexpected response format. Please try again.");
        onValidated(false);
      }
    } catch (e: any) {
      console.error("Verification error:", e);
      setError(e.message || "Verification failed. Please try again.");
      onValidated(false);
    } finally {
      setLoading(false);
      validationInProgress.current = false;
    }
  };

  // Remove single file
  const handleRemove = (id: string) => () => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    // Reset validation state when an image is removed
// Reset validation state when new images are added, but keep success if we have enough valid images
if (validationAttempted) {
  setValidationAttempted(false);
  
  // Only reset success if we don't have enough valid images yet
  const validCount = items.filter(i => i.status === "valid").length;
  if (validCount < minImages) {
    setSuccess(false);
  }
  
  setError(null); // Clear any error messages
}
  };

  const hasInvalid = items.some((i) => i.status === "invalid");
  const hasDuplicate = items.some((i) => i.status === "duplicate");
  const validItemCount = items.filter(i => i.status === "valid").length;
  const pendingItemCount = items.filter(i => i.status === "pending").length;
  const nonDuplicateCount = items.filter(i => i.status !== "duplicate").length;

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleProceedToPayment = () => {
    if (onProceedToPayment) {
      onProceedToPayment();
    }
    // We no longer call onClose() here - let the parent component decide
  };
  
  // CRITICAL: Prevent dialog from closing automatically
  // Instead of using the onClose prop directly, use a custom handler
  const handleClose = () => {
    // Only allow closing if not currently loading
    if (!loading) {
      onClose();
    }
  };

// Effect to notify parent of validation status when dialog opens
useEffect(() => {
  if (open) {
    // Reset validation in progress flag when dialog opens
    validationInProgress.current = false;
    // Don't reset success state or validation state when reopening
  }
}, [open]);

  return (
    <>
      {/* CRITICAL: Use our custom handleClose here */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="lg"
        // Prevent closing by clicking backdrop or pressing escape
        disableEscapeKeyDown={loading}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(to right, #1e4d8c, #00a99d)',
          color: 'white',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          p: 2
        }}>
          <Typography variant="h5">Select Images for Your AI Headshots</Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Please select {minImages}–{maxImages} high-quality images (each with at least {minFacePercent}% face area).
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
                ? "#00a99d"
                : theme.palette.divider,
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              bgcolor: isDragActive ? "rgba(0, 169, 157, 0.1)" : "transparent",
              mb: 3,
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "#00a99d",
                bgcolor: "rgba(0, 169, 157, 0.05)",
              },
            }}
          >
            <input {...getInputProps()} />
            <Typography>
              {isDragActive
                ? "Drop your images here..."
                : `Click or drag to select images (you've selected ${nonDuplicateCount} of ${minImages} required)`}
            </Typography>
          </Box>

          {/* Pending uploads */}
          {items.some((i) => i.status === "pending") && (
            <>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Pending Verification
              </Typography>
              <Grid container spacing={2}>
                {items
                  .filter((i) => i.status === "pending")
                  .map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Card sx={{ position: "relative" }} elevation={2}>
                          <CardMedia
                            component="img"
                            sx={{ width: "100%", height: 150, objectFit: "cover" }}
                            image={URL.createObjectURL(item.file)}
                            alt={item.file.name}
                          />
                          <CardActions sx={{ justifyContent: "center", p: 1 }}>
                            <IconButton
                              size="small"
                              onClick={handleRemove(item.id)}
                              sx={{ color: "black" }}
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

          {/* Duplicates */}
          {items.some((i) => i.status === "duplicate") && (
            <>
              <Typography variant="subtitle2" color="orange" sx={{ mt: 2, mb: 1 }}>
                Duplicate Images (Not Counted)
              </Typography>
              <Grid container spacing={2}>
                {items
                  .filter((i) => i.status === "duplicate")
                  .map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Card
                          sx={{
                            position: "relative",
                            border: "2px solid orange",
                          }}
                          elevation={2}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              bgcolor: "rgba(255, 165, 0, 0.7)",
                              borderBottomLeftRadius: 8,
                              p: 0.5,
                              zIndex: 1,
                            }}
                          >
                            <Typography variant="caption" sx={{ color: "white", fontWeight: "bold" }}>
                              Duplicate
                            </Typography>
                          </Box>
                          <CardMedia
                            component="img"
                            sx={{ 
                              width: "100%", 
                              height: 150, 
                              objectFit: "cover",
                              opacity: 0.6 
                            }}
                            image={URL.createObjectURL(item.file)}
                            alt={item.file.name}
                          />
                          <CardActions sx={{ justifyContent: "center", p: 1 }}>
                            <IconButton
                              size="small"
                              onClick={handleRemove(item.id)}
                              sx={{ color: "black" }}
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

          {/* Validated: Successful */}
          {items.some((i) => i.status === "valid") && (
            <>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: "#00a99d", fontWeight: "bold" }}>
                Verified Images ({items.filter(i => i.status === "valid").length})
              </Typography>
              <Grid container spacing={2}>
                {items
                  .filter((i) => i.status === "valid")
                  .map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Card
                          sx={{
                            position: "relative",
                            border: `2px solid #00a99d`,
                          }}
                          elevation={2}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              bgcolor: "rgba(0, 169, 157, 0.7)",
                              borderBottomLeftRadius: 8,
                              p: 0.5,
                              zIndex: 1,
                            }}
                          >
                            <CheckCircleIcon sx={{ color: "white", fontSize: 16 }} />
                          </Box>
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                            }}
                            image={URL.createObjectURL(item.file)}
                            alt={item.file.name}
                          />
                          <CardActions sx={{ justifyContent: "center", p: 1 }}>
                            <IconButton
                              size="small"
                              onClick={handleRemove(item.id)}
                              sx={{ color: "black" }}
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

          {/* Validated: Failed */}
          {items.some((i) => i.status === "invalid") && (
            <>
              <Typography variant="subtitle2" color="error" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                Images That Need Replacement
              </Typography>
              <Grid container spacing={2}>
                {items
                  .filter((i) => i.status === "invalid")
                  .map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Card
                          sx={{
                            position: "relative",
                            border: `2px solid ${theme.palette.error.main}`,
                          }}
                          elevation={2}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              bgcolor: "rgba(211, 47, 47, 0.7)",
                              borderBottomLeftRadius: 8,
                              p: 0.5,
                              zIndex: 1,
                            }}
                          >
                            <ErrorIcon sx={{ color: "white", fontSize: 16 }} />
                          </Box>
                          {item.errorMessage && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 40, // Positioned above the delete button
                                left: 0,
                                right: 0,
                                bgcolor: "rgba(211, 47, 47, 0.7)",
                                p: 0.5,
                                zIndex: 1,
                              }}
                            >
                              <Typography variant="caption" sx={{ color: "white", fontWeight: "bold", textAlign: "center", display: "block" }}>
                                {item.errorMessage}
                              </Typography>
                            </Box>
                          )}
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                            }}
                            image={URL.createObjectURL(item.file)}
                            alt={item.file.name}
                          />
                          <CardActions sx={{ justifyContent: "center", p: 1 }}>
                            <IconButton
                              size="small"
                              onClick={handleRemove(item.id)}
                              sx={{ color: "black" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
              </Grid>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Please replace these images with photos that have a clearer view of your face (at least {minFacePercent}% of the image).
              </Typography>
            </>
          )}

          {items.length === 0 && (
            <Box sx={{ textAlign: "center", my: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No images selected yet. Please upload {minImages}-{maxImages} high-quality selfies.
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => {
              setItems([]);
              setError(null);
              setValidationAttempted(false);
              setSuccess(false);
            }}
            disabled={loading || items.length === 0}
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
          
          {success && validItemCount >= minImages ? (
            <Button
              variant="contained"
              onClick={handleProceedToPayment}
              sx={{
                background: 'linear-gradient(to right, #1e4d8c, #00a99d)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(to right, #15385d, #007a70)',
                }
              }}
            >
              Proceed to Payment
            </Button>
          ) : (
<Button
  variant="contained"
  onClick={handleVerify}
  disabled={loading || nonDuplicateCount < minImages} 
  startIcon={loading ? <CircularProgress size={20} /> : null}
  sx={{
    background: nonDuplicateCount >= minImages ? 
      'linear-gradient(to right, #1e4d8c, #00a99d)' : 
      'rgba(0, 0, 0, 0.12)',
    color: nonDuplicateCount >= minImages ? 'white' : 'rgba(0, 0, 0, 0.26)',
    '&:hover': {
      background: nonDuplicateCount >= minImages ? 
        'linear-gradient(to right, #15385d, #007a70)' : 
        'rgba(0, 0, 0, 0.12)'
    },
    '&.Mui-disabled': {
      background: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)'
    }
  }}
>
  {loading ? "Verifying..." : "Verify Images"}
</Button>
          )}
        </DialogActions>
      </Dialog>

{/* Success notification */}
<Snackbar
  open={success}
  autoHideDuration={60000} // Increase to 60 seconds to prevent auto-closing
  onClose={() => {}} // Don't reset success state when Snackbar closes
  message={successMessage}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  sx={{
    "& .MuiSnackbarContent-root": {
      bgcolor: "#00a99d",
      color: "white",
    }
  }}
/>
    </>
  );
}