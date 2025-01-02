import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from './ui/Dialog';
import { Bearing, Housing, Part, Configuration } from '../types';
import { getCurrentUser, saveConfiguration } from '../utils/localStorage';

interface SaveConfigurationButtonProps {
  bearing: Bearing;
  housing: Housing;
  parts: Part[];
  onSave: () => void;
}

export const SaveConfigurationButton: React.FC<SaveConfigurationButtonProps> = ({
  bearing,
  housing,
  parts,
  onSave
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [configName, setConfigName] = useState('');

  const handleSave = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const config: Configuration = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      userName: currentUser.email,
      name: configName,
      createdAt: new Date().toISOString(),
      bearing,
      housing,
      parts
    };

    saveConfiguration(config);
    setIsOpen(false);
    onSave();
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        <Save className="h-5 w-5 mr-2" />
        Save Configuration
      </motion.button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Save Configuration"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="configName" className="block text-sm font-medium text-gray-700">
              Configuration Name
            </label>
            <input
              type="text"
              id="configName"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter a name for your configuration"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={!configName.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </motion.button>
          </div>
        </div>
      </Dialog>
    </>
  );
};