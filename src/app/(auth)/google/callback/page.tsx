"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; max-age=${60 * 60 * 24}; path=/`;
      setTimeout(() => {
        router.push("/user");
      }, 1500);
    } else {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <h1 className="text-2xl font-semibold">Logging you in with Google…</h1>
        <p className="text-gray-400 text-sm">
          Please wait while we redirect you
        </p>
      </div>
    </div>
  );
}
