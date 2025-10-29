"use client";

import { useState } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";

export default function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      // Exit fullscreen mode
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="p-2 text-xl text-gray-700 dark:text-white transition"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
      {isFullscreen ? <FaCompress /> : <FaExpand />}
    </button>
  );
}
