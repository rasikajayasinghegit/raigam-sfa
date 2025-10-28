"use client";

import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/redux/store";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
