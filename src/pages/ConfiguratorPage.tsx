import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bearings, housings, parts } from '../data';
import { Bearing, Housing, Part } from '../types';
import { SearchBar } from '../components/ui/SearchBar';
import { Section } from '../components/ui/Section';
import { PartCard } from '../components/PartCard';
import { SaveConfigurationButton } from '../components/SaveConfigurationButton';

export const ConfiguratorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBearing, setSelectedBearing] = useState<Bearing | null>(null);
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);

  const handleSaveSuccess = () => {
    setSelectedBearing(null);
    setSelectedHousing(null);
    setSelectedParts([]);
    navigate('/configurations');
  };

  const filteredBearings = bearings.filter(bearing =>
    bearing.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bearing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const compatibleHousings = selectedBearing
    ? housings.filter(housing => housing.compatibleBearings.includes(selectedBearing.id))
    : [];

  const compatibleParts = selectedHousing
    ? parts.filter(part => part.compatibleHousings.includes(selectedHousing.id))
    : [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search bearing by ID or name..."
      />

      <Section title="Available Bearings" show={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBearings.map(bearing => (
            <motion.div
              key={bearing.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBearing(bearing)}
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                selectedBearing?.id === bearing.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium">{bearing.name}</h3>
              <p className="text-sm text-gray-600">ID: {bearing.id}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {selectedBearing && (
        <Section title="Compatible Housings" show={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibleHousings.map(housing => (
              <motion.div
                key={housing.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedHousing(housing)}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedHousing?.id === housing.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium">{housing.name}</h3>
                <p className="text-sm text-gray-600">{housing.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {selectedHousing && (
        <Section title="Compatible Parts" show={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibleParts.map(part => (
              <PartCard
                key={part.id}
                part={part}
                isSelected={selectedParts.some(p => p.id === part.id)}
                onClick={() => {
                  if (selectedParts.find(p => p.id === part.id)) {
                    setSelectedParts(selectedParts.filter(p => p.id !== part.id));
                  } else {
                    setSelectedParts([...selectedParts, part]);
                  }
                }}
              />
            ))}
          </div>

          {selectedParts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-end"
            >
              <SaveConfigurationButton
                bearing={selectedBearing}
                housing={selectedHousing}
                parts={selectedParts}
                onSave={handleSaveSuccess}
              />
            </motion.div>
          )}
        </Section>
      )}
    </div>
  );
};