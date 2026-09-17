"use client";

import React, { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  formatAsRupiah?: boolean;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  formatAsRupiah = true,
  suffix = "",
  className = "",
}: AnimatedNumberProps): JSX.Element {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, {
    damping: 30,
    stiffness: 250,
  });

  const displayVal = useTransform(springVal, (current) => {
    const rounded = Math.round(current);
    if (formatAsRupiah) {
      const formatted = new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 0,
      }).format(rounded);
      return `Rp${formatted}${suffix}`;
    }
    return `${rounded}${suffix}`;
  });

  const prevValueRef = useRef(value);

  useEffect(() => {
    motionVal.set(value);
    prevValueRef.current = value;
  }, [value, motionVal]);

  return (
    <motion.span className={`tabular-nums font-mono ${className}`}>
      {displayVal}
    </motion.span>
  );
}
