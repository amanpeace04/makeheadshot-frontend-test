// src/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import apiHelper from "@/helpers/apiHelper";

type User = {
  email: string;
  provider: string;
  name: string;
  picture_url: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;
    const protectedRoutePrefixes = ["/user", "/profile"];

    const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
      currentPath.startsWith(prefix)
    );

    if (!token) {
      // no token → stop loading, then redirect
      setLoading(false);
      if (isProtectedRoute) {
        router.replace("/login");
      }
      return;
    }

    // we *do* have a token, so fetch profile
    (async () => {
      try {
        const profile = await apiHelper.get<User>("/auth/profile");
        setUser(profile);
      } catch (err) {
        // invalid token → clear & redirect
        console.error("Failed to fetch profile:", err);
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
