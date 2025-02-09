"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLMotionProps<"div"> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn(
        theme === "dark" ? "bg-white/10" : "bg-gray-200",
        "rounded-md",
        className
      )}
      {...props}
    />
  );
} 