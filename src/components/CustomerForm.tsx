import React, { useState } from 'react';
import { Users, Phone, UserPlus } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const CustomerForm: React.FC<{ onJoinQueue: (id: string) => void }> = ({ onJoinQueue }) => {
  const { addToQueue } = useQueue();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    partySize: 1,
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    const numericValue = e.target.value.replace(/\D/g, '');
    
    // Format the phone number as user types (XXX-XXX-XXXX)
    let formattedNumber = '';
    if (numericValue.length <= 3) {
      formattedNumber = numericValue;
    } else if (numericValue.length <= 6) {
      formattedNumber = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
      formattedNumber = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    }

    setFormData({ ...formData, phoneNumber: formattedNumber });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerId = addToQueue(formData);
    onJoinQueue(customerId);
    setFormData({ fullName: '', phoneNumber: '', partySize: 1 });
  };

  const inputClasses = `
    pl-10 w-full p-3 
    bg-white/90 
    rounded-lg 
    border-2
    focus:ring-2 
    transition-all 
    font-sans
    backdrop-blur-sm
    hover:border-opacity-75
    focus:border-opacity-100
    shadow-sm
    hover:shadow-md
    focus:shadow-md
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div>
        <label className="block font-serif text-sm font-medium mb-2" htmlFor="fullName">
          {t('fullName')}
        </label>
        <div className="relative flex items-center">
          <Users 
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
            style={{ color: theme.secondary }} 
            size={20} 
          />
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={inputClasses}
            style={{ 
              borderColor: theme.primary,
              '--tw-ring-color': theme.accent,
              '--tw-ring-opacity': 0.5
            } as React.CSSProperties}
            placeholder={t('fullName')}
          />
        </div>
      </div>

      <div>
        <label className="block font-serif text-sm font-medium mb-2" htmlFor="phoneNumber">
          {t('phoneNumber')}
        </label>
        <div className="relative flex items-center">
          <Phone 
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
            style={{ color: theme.secondary }} 
            size={20} 
          />
          <input
            id="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength={12}
            className={inputClasses}
            style={{ 
              borderColor: theme.primary,
              '--tw-ring-color': theme.accent,
              '--tw-ring-opacity': 0.5
            } as React.CSSProperties}
            placeholder="XXX-XXX-XXXX"
          />
        </div>
      </div>

      <div>
        <label className="block font-serif text-sm font-medium mb-2" htmlFor="partySize">
          {t('partySize')}
        </label>
        <div className="relative flex items-center">
          <UserPlus 
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
            style={{ color: theme.secondary }} 
            size={20} 
          />
          <input
            id="partySize"
            type="number"
            required
            min="1"
            max="20"
            value={formData.partySize}
            onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) })}
            className={inputClasses}
            style={{ 
              borderColor: theme.primary,
              '--tw-ring-color': theme.accent,
              '--tw-ring-opacity': 0.5
            } as React.CSSProperties}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg text-white font-serif text-lg transition-all transform hover:scale-105 hover:shadow-lg"
        style={{ 
          background: '#1B4332',
        }}
      >
        {t('joinQueueButton')}
      </button>
    </form>
  );
};

export default CustomerForm;