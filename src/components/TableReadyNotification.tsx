import React from 'react';
import { PartyPopper, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Customer } from '../types';

interface TableReadyNotificationProps {
  customer: Customer;
}

const TableReadyNotification: React.FC<TableReadyNotificationProps> = ({ customer }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="text-center space-y-6">
      <div className="animate-bounce">
        <PartyPopper
          size={64}
          className="mx-auto"
          style={{ color: theme.primary }}
        />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
          {t('tableReady')}
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          {customer.fullName}'s {t('partyOf')} {customer.partySize}
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 border-2 shadow-lg max-w-sm mx-auto"
           style={{ borderColor: theme.accent }}>
        <p className="text-lg mb-2">{t('tableCode')}</p>
        <div className="text-4xl font-bold tracking-wide mb-4" style={{ color: theme.secondary }}>
          {customer.tableCode}
        </div>
        <p className="text-sm text-gray-600">
          {t('showCode')}
        </p>
      </div>

      <div className="mt-8 p-4 bg-white/80 rounded-lg">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <span>{t('proceedToHost')}</span>
          <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default TableReadyNotification