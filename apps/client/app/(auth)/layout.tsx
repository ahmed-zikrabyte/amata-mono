"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // optional: spinner icon from lucide-react
import { useAuthStore } from "../../hooks/useAuthStore";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => checkAuth(), []);

  useEffect(() => {
    console.log("working in auth layout");
    if (isAuthenticated) {
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-600 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
