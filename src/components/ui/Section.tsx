import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionProps {
  title: string;
  show: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, show, children }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-8"
    >
      <motion.h2
        layout="position"
        className="text-lg font-semibold mb-4"
      >
        {title}
      </motion.h2>
      
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};