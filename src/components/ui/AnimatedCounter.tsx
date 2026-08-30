'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  formatAsCurrency?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
  formatAsCurrency = true,
}: AnimatedCounterProps) {
  const spring = useSpring(value, {
    stiffness: 75,
    damping: 18,
    mass: 0.8,
  });

  const [displayValue, setDisplayValue] = useState<string>(() => {
    return formatAsCurrency
      ? new Intl.NumberFormat('en-IN', {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        }).format(value)
      : value.toFixed(decimals);
  });

  const formatted = useTransform(spring, (current) => {
    const num = Math.max(0, current);
    if (formatAsCurrency) {
      return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      }).format(num);
    }
    return num.toFixed(decimals);
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = formatted.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [formatted]);

  return (
    <motion.span className={`inline-flex items-baseline tabular-nums ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span>{displayValue}</span>
      {suffix && <span>{suffix}</span>}
    </motion.span>
  );
}
