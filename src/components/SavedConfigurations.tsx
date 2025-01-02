import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Configuration } from '../types';
import { getAllConfigurations } from '../utils/localStorage';
import { ConfigurationCard } from './ConfigurationCard';

export const SavedConfigurations: React.FC = () => {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setConfigurations(getAllConfigurations());
  }, []);

  const filteredConfigurations = configurations.filter(config => 
    (config.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (config.userName?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Saved Configurations</h2>
        
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search configurations by name or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {filteredConfigurations.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600"
          >
            No configurations found.
          </motion.p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredConfigurations.map(config => (
              <ConfigurationCard
                key={config.id}
                config={config}
                onDelete={(configId) => {
                  const updatedConfigs = configurations.filter(c => c.id !== configId);
                  localStorage.setItem('bearing_configurations', JSON.stringify(updatedConfigs));
                  setConfigurations(updatedConfigs);
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};