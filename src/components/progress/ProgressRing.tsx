"use client";

import React from "react";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  bgColorClass?: string;
  showText?: boolean;
  label?: string;
}

export function ProgressRing({
  percentage,
  size = 40,
  strokeWidth = 3.5,
  colorClass = "text-pelunas-400",
  bgColorClass = "text-surface-subtle",
  showText = true,
  label = "Kemajuan Pelunasan",
}: ProgressRingProps): JSX.Element {
  const cleanPercentage = Math.min(100, Math.max(0, Math.round(percentage)));

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cleanPercentage / 100) * circumference;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={cleanPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative inline-flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
        aria-hidden="true"
      >
        {/* Background track circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`${bgColorClass} opacity-40`}
        />

        {/* Progress indicator circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-500 ease-out`}
        />
      </svg>

      {showText && (
        <span
          className="absolute text-[10px] font-bold tracking-tighter text-foreground font-mono"
          aria-hidden="true"
        >
          {cleanPercentage}%
        </span>
      )}
    </div>
  );
}
