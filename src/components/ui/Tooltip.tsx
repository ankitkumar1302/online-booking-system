"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function Tooltip({ 
  children, 
  content, 
  side = "top", 
  align = "center" 
}: TooltipProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        delayDuration={100}
      >
        <TooltipPrimitive.Trigger asChild>
          <span className="inline-block">{children}</span>
        </TooltipPrimitive.Trigger>
        <AnimatePresence>
          {isOpen && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                side={side}
                align={align}
                sideOffset={4}
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={`
                    z-50 px-3 py-1.5 text-sm rounded-lg shadow-lg
                    ${theme === "dark" 
                      ? "bg-gray-800 text-white" 
                      : "bg-white text-gray-900 border border-gray-200"
                    }
                  `}
                >
                  {content}
                  <TooltipPrimitive.Arrow 
                    className={theme === "dark" ? "fill-gray-800" : "fill-white stroke-gray-200"} 
                  />
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
} 