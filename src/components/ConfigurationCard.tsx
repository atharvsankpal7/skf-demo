import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, User } from 'lucide-react';
import { Configuration } from '../types';
import { getCurrentUser } from '../utils/localStorage';

interface ConfigurationCardProps {
  config: Configuration;
  onDelete: (id: string) => void;
}

export const ConfigurationCard: React.FC<ConfigurationCardProps> = ({ config, onDelete }) => {
  const currentUser = getCurrentUser();
  const canDelete = currentUser?.id === config.userId;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={item}
      layout
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{config.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <User className="h-4 w-4 mr-1" />
            <span>{config.userName}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Created: {new Date(config.createdAt).toLocaleDateString()}
          </p>
        </div>
        {canDelete && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(config.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Bearing</h4>
          <p className="text-sm text-gray-600">{config.bearing.name}</p>
        </div>
        
        <div>
          <h4 className="font-medium">Housing</h4>
          <p className="text-sm text-gray-600">{config.housing.name}</p>
        </div>
        
        <div>
          <h4 className="font-medium">Selected Parts</h4>
          <ul className="text-sm text-gray-600">
            {config.parts.map(part => (
              <li key={part.id} className="flex items-center mt-1">
                <img
                  src={part.imageUrl}
                  alt={part.name}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <span>{part.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};