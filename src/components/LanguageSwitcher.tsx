import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Languages } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 shadow-md hover:shadow-lg transition-all transform hover:scale-105 backdrop-blur-sm border"
      style={{ borderColor: theme.accent }}
    >
      <Languages 
        size={20} 
        style={{ color: theme.secondary }}
        className="animate-pulse"
      />
      <span 
        className="font-medium"
        style={{ color: theme.primary }}
      >
        {language === 'en' ? 'Español' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;