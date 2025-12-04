'use client';

import { motion, MotionProps } from "framer-motion";
import React, { ReactNode } from "react";

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string; // allow responsive Tailwind classes
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className} // responsive layout classes can be passed
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
