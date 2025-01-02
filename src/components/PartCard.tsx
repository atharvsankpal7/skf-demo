import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Part } from '../types';

interface PartCardProps {
  part: Part;
  isSelected: boolean;
  onClick: () => void;
}

export const PartCard = forwardRef<HTMLDivElement, PartCardProps>(
  ({ part, isSelected, onClick }, ref) => {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`p-4 border rounded-md cursor-pointer transition-all ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
        }`}
      >
        <motion.div
          layout
          className="relative w-full pb-[75%] mb-4 overflow-hidden rounded-md bg-gray-100"
        >
          <motion.img
            layoutId={`image-${part.id}`}
            src={part.imageUrl}
            alt={part.name}
            className="absolute inset-0 w-full h-full object-fit transform hover:scale-105 transition-transform duration-300"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <motion.h3 layout="position" className="font-medium text-lg">
          {part.name}
        </motion.h3>
        <motion.p layout="position" className="text-sm text-gray-600 mt-1">
          {part.description}
        </motion.p>
        <motion.span
          layout="position"
          className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded-full font-medium"
        >
          {part.type}
        </motion.span>
      </motion.div>
    );
  }
);

PartCard.displayName = 'PartCard';