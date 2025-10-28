"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/redux/store";

/**
 * Redirects to /signin (or custom route) if no user is logged in.
 */
export function useAuth(redirectTo: string = "/signin") {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);
}
