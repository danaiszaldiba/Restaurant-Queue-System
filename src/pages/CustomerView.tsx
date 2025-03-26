import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import QueueStatus from '../components/QueueStatus';
import { useTheme } from '../context/ThemeContext';
import { Crown } from 'lucide-react';

const CustomerView: React.FC = () => {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleJoinQueue = (id: string) => {
    setCustomerId(id);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center py-12 px-4"
      style={{ 
        backgroundColor: theme.background,
        backgroundImage: `linear-gradient(120deg, ${theme.primary}0a 0%, ${theme.secondary}0a 100%)`
      }}
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Crown size={48} style={{ color: theme.primary }} />
        </div>
        <h1 
          className="font-serif text-5xl font-bold mb-4"
          style={{ color: theme.secondary }}
        >
          Versailles Restaurant
        </h1>
        <p className="font-serif text-xl italic" style={{ color: theme.primary }}>
          La Casa del Mejor Café Cubano
        </p>
        {!customerId && (
          <p className="mt-6 text-lg text-gray-600 font-sans">
            Join our virtual queue to experience authentic Cuban cuisine
          </p>
        )}
      </div>

      <div 
        className="w-full max-w-md backdrop-blur-sm bg-white/50 p-8 rounded-2xl shadow-lg"
        style={{ borderColor: theme.accent, borderWidth: '1px' }}
      >
        {!customerId ? (
          <CustomerForm onJoinQueue={handleJoinQueue} />
        ) : (
          <QueueStatus customerId={customerId} />
        )}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 font-sans">
        <p>© 2025 Versailles Restaurant</p>
        <p className="mt-1">The World's Most Famous Cuban Restaurant</p>
      </div>
    </div>
  );
};

export default CustomerView;