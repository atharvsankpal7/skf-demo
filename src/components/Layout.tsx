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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
              Bearing Housing
            </Link>
            <nav className="flex flex-wrap gap-2 sm:gap-4">
              <Link
                to="/"
                className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors text-sm sm:text-base ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                Configurator
              </Link>
              <Link
                to="/configurations"
                className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors text-sm sm:text-base ${
                  location.pathname === '/configurations'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                Saved
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-900 rounded-md transition-colors text-sm sm:text-base"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
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