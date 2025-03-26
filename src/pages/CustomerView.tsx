import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import QueueStatus from '../components/QueueStatus';
import { useTheme } from '../context/ThemeContext';
import { Sunset, Palmtree as Palm } from 'lucide-react';

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
        backgroundImage: 'linear-gradient(120deg, rgba(255,107,53,0.05) 0%, rgba(0,78,137,0.05) 100%)'
      }}
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <Palm size={40} className="text-orange-500" />
          <Sunset size={48} style={{ color: theme.primary }} />
          <Palm size={40} className="text-orange-500" />
        </div>
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.primary }}
        >
          Tropical Sunset
        </h1>
        <p className="text-xl" style={{ color: theme.secondary }}>
          Experience Paradise, One Bite at a Time
        </p>
        {!customerId && (
          <p className="mt-6 text-lg text-gray-600">
            Join our virtual queue to begin your tropical dining experience
          </p>
        )}
      </div>

      <div className="w-full max-w-md backdrop-blur-sm bg-white/50 p-8 rounded-2xl shadow-lg border border-orange-100">
        {!customerId ? (
          <CustomerForm onJoinQueue={handleJoinQueue} />
        ) : (
          <QueueStatus customerId={customerId} />
        )}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>© 2025 Tropical Sunset Restaurant</p>
      </div>
    </div>
  );
};

export default CustomerView;