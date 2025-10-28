"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/redux/store";

export function useAuth(redirectTo = "/signin") {
  const router = useRouter();
  const user = useSelector((s: RootState) => s.auth.user);

  useEffect(() => {
    if (!user) router.push(redirectTo);
  }, [user]);
}
