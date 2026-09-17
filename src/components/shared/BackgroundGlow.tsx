"use client";

import React from "react";

/**
 * Aura Gradient: Adaptive "Digital Rain" & "Luminous Pearl"
 * Multi-layered CSS blend-mode atmospheric background.
 * - Light Theme: Uses multiply blend mode for a soft, fresh watercolor glow on warm pearl white.
 * - Dark Theme: Uses screen & overlay blend modes on deep backdrop (#100e0b).
 */
export function BackgroundGlow(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none -z-0 select-none min-h-screen"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="aura-layer-3" aria-hidden="true" />
      <div className="aura-layer-4" aria-hidden="true" />

      {/* Subtle tactile grid pattern that adapts between light and dark */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_65%,transparent_100%)] pointer-events-none transition-colors duration-300"
        aria-hidden="true"
      />
    </div>
  );
}
