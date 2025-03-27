import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  joinQueue: {
    en: 'Join our virtual queue to experience authentic Cuban cuisine',
    es: 'Únete a nuestra cola virtual para disfrutar de auténtica cocina cubana'
  },
  title: {
    en: 'Versailles Restaurant',
    es: 'Restaurante Versailles'
  },
  subtitle: {
    en: 'The House of the Best Cuban Coffee',
    es: 'La Casa del Mejor Café Cubano'
  },
  copyright: {
    en: "The World's Most Famous Cuban Restaurant",
    es: 'El Restaurante Cubano Más Famoso del Mundo'
  },
  fullName: {
    en: 'Full Name',
    es: 'Nombre Completo'
  },
  phoneNumber: {
    en: 'Phone Number',
    es: 'Número de Teléfono'
  },
  partySize: {
    en: 'Party Size',
    es: 'Tamaño del Grupo'
  },
  joinQueueButton: {
    en: 'Join Queue',
    es: 'Unirse a la Cola'
  },
  // Queue Status translations
  youreInQueue: {
    en: "You're in Queue!",
    es: '¡Estás en la Cola!'
  },
  positionInQueue: {
    en: 'Position in Queue:',
    es: 'Posición en la Cola:'
  },
  estimatedWaitTime: {
    en: 'Estimated Wait Time:',
    es: 'Tiempo Estimado de Espera:'
  },
  minutes: {
    en: 'mins',
    es: 'mins'
  },
  partyDetails: {
    en: 'Party Details:',
    es: 'Detalles del Grupo:'
  },
  name: {
    en: 'Name:',
    es: 'Nombre:'
  },
  partySizeLabel: {
    en: 'Party Size:',
    es: 'Tamaño del Grupo:'
  },
  phone: {
    en: 'Phone:',
    es: 'Teléfono:'
  },
  browseMenu: {
    en: 'Browse Our Menu',
    es: 'Explora Nuestro Menú'
  },
  // Table Ready translations
  tableReady: {
    en: 'Your Table is Ready!',
    es: '¡Su Mesa está Lista!'
  },
  partyOf: {
    en: 'Party of',
    es: 'Grupo de'
  },
  tableCode: {
    en: 'Your Table Code:',
    es: 'Código de su Mesa:'
  },
  showCode: {
    en: 'Please show this code to our host',
    es: 'Por favor muestre este código a nuestro anfitrión'
  },
  proceedToHost: {
    en: 'Proceed to host stand',
    es: 'Diríjase al puesto del anfitrión'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};