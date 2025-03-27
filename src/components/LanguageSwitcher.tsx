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
      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/20"
      style={{ color: theme.primary }}
    >
      <Languages size={20} />
      <span className="font-medium">{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;