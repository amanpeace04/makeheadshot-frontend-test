// pages/login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import apiHelper from "@/helpers/apiHelper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiHelper.post("/auth/login", { email, password });
      const token = res.access_token;

      // store token
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; max-age=${60 * 60 * 24}; path=/`;

      toast.success("Logged in successfully!");
      setTimeout(() => router.push("/"), 800);
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    toast.info("Google OAuth flow not implemented yet");
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

      <Grid
        container
        sx={{
          maxWidth: 1200,
          mx: "auto",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {isMdUp && (
          <Grid
            item
            md={6}
            component={motion.div}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            sx={{
              backgroundImage: `url('/login-illustration.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 600,
            }}
          />
        )}

        <Grid
          item
          xs={12}
          md={6}
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
          sx={{
            bgcolor: "white",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={4}
          >
            Sign in to your account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
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

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
            >
              {loading ? "Signing in…" : "Sign In"}
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
                borderColor: "#ccc",
                "&:hover": { borderColor: "#aaa" },
              }}
            >
              Continue with Google
            </Button>
          </Box>

          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="text.secondary">
              Don’t have an account?{" "}
              <Link href="/signup" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
