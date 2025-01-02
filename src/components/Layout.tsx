import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, Settings, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Bearing Housing Configuration
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="h-5 w-5 mr-2" />
                Configurator
              </Link>
              <Link
                to="/configurations"
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  location.pathname === '/configurations'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Save className="h-5 w-5 mr-2" />
                Saved Configurations
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </motion.button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}