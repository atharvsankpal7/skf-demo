import React, { useState } from "react";
import { LogOut, List, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { bearings, housings, parts } from "../data";
import { Bearing, Housing, Part } from "../types";
import { setCurrentUser } from "../utils/localStorage";
import { PartCard } from "./PartCard";
import { SaveConfigurationButton } from "./SaveConfigurationButton";
import { SavedConfigurations } from "./SavedConfigurations";
import { SearchBar } from "./ui/SearchBar";
import { Section } from "./ui/Section";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBearing, setSelectedBearing] = useState<Bearing | null>(null);
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [showConfigurations, setShowConfigurations] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    onLogout();
  };

  const handleSaveSuccess = () => {
    setSelectedBearing(null);
    setSelectedHousing(null);
    setSelectedParts([]);
    setShowConfigurations(true);
  };

  if (showConfigurations) {
    return (
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfigurations(false)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <ChevronDown className="h-5 w-5 mr-1 rotate-90" />
              Back to Configuration
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </motion.button>
          </div>
        </header>
        <SavedConfigurations />
      </div>
    );
  }

  const filteredBearings = bearings.filter(
    (bearing) =>
      bearing.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bearing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const compatibleHousings = selectedBearing
    ? housings.filter((housing) =>
        housing.compatibleBearings.includes(selectedBearing.id)
      )
    : [];

  const compatibleParts = selectedHousing
    ? parts.filter((part) =>
        part.compatibleHousings.includes(selectedHousing.id)
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Bearing Housing Configuration
          </h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfigurations(true)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <List className="h-5 w-5 mr-2" />
              Saved Configurations
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search bearing by ID or name..."
          />

          <Section title="Available Bearings" show={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredBearings.map((bearing) => (
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
                      selectedBearing?.id === bearing.id
                        ? "border-blue-500 bg-blue-50"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-medium">{bearing.name}</h3>
                    <p className="text-sm text-gray-600">ID: {bearing.id}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Section>

          {selectedBearing && (
            <Section title="Compatible Housings" show={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {compatibleHousings.map((housing) => (
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
                        selectedHousing?.id === housing.id
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <h3 className="font-medium">{housing.name}</h3>
                      <p className="text-sm text-gray-600">
                        {housing.description}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Section>
          )}

          {selectedHousing && (
            <Section title="Compatible Parts" show={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {compatibleParts.map((part) => (
                    <PartCard
                      key={part.id}
                      part={part}
                      isSelected={selectedParts.some((p) => p.id === part.id)}
                      onClick={() => {
                        if (selectedParts.find((p) => p.id === part.id)) {
                          setSelectedParts(
                            selectedParts.filter((p) => p.id !== part.id)
                          );
                        } else {
                          setSelectedParts([...selectedParts, part]);
                        }
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {selectedParts.length > 0 && selectedBearing && (
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
      </main>
    </div>
  );
};
