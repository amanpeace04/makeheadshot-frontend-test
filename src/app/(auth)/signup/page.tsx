// pages/signup.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import {
  MdPhotoCamera,
  MdMemory,
  MdAutoFixHigh,
  MdDownload,
  MdShare,
} from "react-icons/md";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import Image from "next/image";
import apiHelper from "@/helpers/apiHelper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const theme = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await apiHelper.post("/auth/signup", {
        name,
        email,
        password,
      });

      const token = res.access_token;
      // store in localStorage
      localStorage.setItem("token", token);
      // store in cookie for 1 day
      document.cookie = `token=${token}; max-age=${60 * 60 * 24}; path=/`;

      toast.success("Account created!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/google`;
  };
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: 1000,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 4,
          overflow: "hidden",
        }}
      >
        {/* ── LEFT: FORM ── */}
        <Box sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Join us by filling in the information below
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              required
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              required
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              required
              fullWidth
              margin="normal"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((v) => !v)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
            >
              {loading ? "Signing up…" : "Sign Up"}
            </Button>

            <Divider sx={{ my: 3 }}>Or continue with</Divider>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<FcGoogle size={24} />}
              onClick={handleGoogle}
              sx={{
                textTransform: "none",
                py: 1.2,
                fontWeight: 500,
                borderColor: "#ddd",
                "&:hover": { borderColor: "#ccc" },
              }}
            >
              Continue with Google
            </Button>
          </Box>

          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* ── RIGHT: USP PANEL ── */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fafafa",
            p: { xs: 4, md: 6 },
            borderLeft: { xs: "none", md: "1px solid #eee" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: 260,
              mb: 4,
            }}
          >
            <Image
              src="/how-it-works-hero.png"
              alt="How it works"
              width={260}
              height={160}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            How It Works
          </Typography>

          {[
            { icon: MdPhotoCamera, title: "Step 1", text: "Upload selfies" },
            { icon: MdMemory, title: "Step 2", text: "AI analyzes photos" },
            {
              icon: MdAutoFixHigh,
              title: "Step 3",
              text: "Customize your style",
            },
            { icon: MdDownload, title: "Step 4", text: "Download headshots" },
            { icon: MdShare, title: "Step 5", text: "Share wherever you like" },
          ].map(({ icon: Icon, title, text }) => (
            <Box
              key={title}
              display="flex"
              alignItems="flex-start"
              width="100%"
              mb={2}
            >
              <Icon
                size={28}
                style={{ marginRight: 12, color: theme.palette.primary.main }}
              />
              <Box>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
