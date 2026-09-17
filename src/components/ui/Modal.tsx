"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidthClass = "max-w-lg",
}: ModalProps): JSX.Element {
  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop Scrim with Apple blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Surface with Apple Spring physics (bottom sheet on mobile, centered modal on tablet/desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className={`relative w-full ${maxWidthClass} apple-card rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/10 z-10 my-0 sm:my-auto max-h-[92vh] flex flex-col`}
          >
            {/* Mobile Sheet Drag Indicator */}
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-3 sm:hidden" aria-hidden="true" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border/60 shrink-0">
              <div className="space-y-1">
                <h2
                  id="modal-title"
                  className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
                >
                  {title}
                </h2>
                {description && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup dialog"
                className="apple-pressable touch-target rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors -mr-2 -mt-2"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body with comfortable scroll if tall */}
            <div className="pt-4 overflow-y-auto flex-1 pr-0.5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
