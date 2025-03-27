import React, { createContext, useContext, useState } from 'react';
import { Theme } from '../types';

const defaultTheme: Theme = {
  primary: '#1B4332', // Versailles forest green
  secondary: '#C5A572', // Versailles gold
  accent: '#2D6A4F', // Lighter green
  background: '#FFFDF9', // Warm white
  text: '#2A2A2A',
};

const ThemeContext = createContext<{
  theme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
}>({
  theme: defaultTheme,
  updateTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme((prev) => ({ ...prev, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);