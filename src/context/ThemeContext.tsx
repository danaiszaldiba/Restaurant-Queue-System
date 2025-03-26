import React, { createContext, useContext, useState } from 'react';
import { Theme } from '../types';

const defaultTheme: Theme = {
  primary: '#C5A572', // Versailles gold
  secondary: '#8B0000', // Deep red
  accent: '#E8D5B5', // Light gold
  background: '#FFFDF9', // Warm white
  text: '#2A2A2A',
  logo: 'https://images.unsplash.com/photo-1577219492769-b63a779fac28?auto=format&fit=crop&q=80&w=200', // Elegant restaurant facade
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