import React from 'react';
import AdminQueue from '../components/AdminQueue';
import VersaillesLogo from '../components/VersaillesLogo';
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
          <div className="flex items-center gap-3">
            <VersaillesLogo size={40} />
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.primary }}
            >
              Restaurant Admin
            </h1>
          </div>
          
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => {
              // Here you would typically open a modal for theme customization
              updateTheme({
                primary: '#1B4332',
                secondary: '#C5A572',
                accent: '#2D6A4F',
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

export default AdminView