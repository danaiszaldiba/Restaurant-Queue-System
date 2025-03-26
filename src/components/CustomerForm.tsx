import React, { useState } from 'react';
import { Users, Phone, UserPlus } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { useTheme } from '../context/ThemeContext';

const CustomerForm: React.FC<{ onJoinQueue: (id: string) => void }> = ({ onJoinQueue }) => {
  const { addToQueue } = useQueue();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    partySize: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerId = addToQueue(formData);
    onJoinQueue(customerId);
    setFormData({ fullName: '', phoneNumber: '', partySize: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div>
        <label className="block font-serif text-sm font-medium mb-2" htmlFor="fullName">
          Full Name
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                style={{ color: theme.secondary }} 
                size={20} />
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 w-full p-3 bg-white/90 backdrop-blur-sm border rounded-lg focus:ring-2 transition-all font-sans"
            style={{ 
              borderColor: theme.primary,
              '--tw-ring-color': theme.accent 
            } as React.CSSProperties}
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div>
        <label className="block font-serif text-sm font-medium mb-2" htmlFor="phoneNumber">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                style={{ color: theme.secondary }} 
                size={20} />
          <input
            id="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="pl-10 w-full p-3 bg-white/90 backdrop-blur-sm border rounded-lg focus:ring-2 transition-all font-sans"
            style={{ 
              borderColor: theme.primary,
              '--tw-ring-color': theme.accent 
            } as React.CSSProperties}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div>
        <label className="block font-serif text-sm font-medium mb-2" htmlFor="partySize">
          Party Size
        </label>
        <div className="relative">
          <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                   style={{ color: theme.secondary }} 
                   size={20} />
          <input
            id="partySize"
            type="number"
            required
            min="1"
            max="20"
            value={formData.partySize}
            onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) })}
            className="pl-10 w-full p-3 bg-white/90 backdrop-blur-sm border rounded-lg focus:ring-2 transition-all font-sans"
            style={{ 
              borderColor: theme.primary,
              '--tw-ring-color': theme.accent 
            } as React.CSSProperties}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg text-white font-serif text-lg transition-all transform hover:scale-102 hover:shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        }}
      >
        Join Queue
      </button>
    </form>
  );
};

export default CustomerForm;