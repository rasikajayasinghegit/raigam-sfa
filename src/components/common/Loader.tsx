"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Loading({
  label = "Loading...",
  fullscreen = false,
}: {
  label?: string;
  fullscreen?: boolean;
}) {
  const Wrapper = fullscreen ? "div" : "span";
  const wrapperClass = fullscreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50"
    : "inline-flex items-center gap-2 text-gray-600";

  return (
    <Wrapper className={wrapperClass}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <Loader2 className="w-6 h-6 text-primary" />
      </motion.div>
      {label && <p className="mt-2 text-sm">{label}</p>}
    </Wrapper>
  );
}
