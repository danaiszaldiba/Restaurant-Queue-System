import React from 'react';
import AdminQueue from '../components/AdminQueue';
import { useTheme } from '../context/ThemeContext';
import { Settings } from 'lucide-react';

const AdminView: React.FC = () => {
  const { theme, updateTheme } = useTheme();

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            {theme.logo ? (
              <img src={theme.logo} alt="Restaurant Logo" className="h-12" />
            ) : (
              <h1 
                className="text-2xl font-bold"
                style={{ color: theme.primary }}
              >
                Restaurant Admin
              </h1>
            )}
          </div>
          
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => {
              // Here you would typically open a modal for theme customization
              // For now, we'll just update with some sample values
              updateTheme({
                primary: '#2563eb',
                secondary: '#1e40af',
                accent: '#3b82f6',
              });
            }}
          >
            <Settings size={24} />
          </button>
        </div>

        <AdminQueue />
      </div>
    </div>
  );
};

export default AdminView;