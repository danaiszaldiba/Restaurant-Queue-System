import React, { createContext, useContext, useState } from 'react';
import { Theme } from '../types';

const defaultTheme: Theme = {
  primary: '#FF6B35', // Warm tropical orange
  secondary: '#004E89', // Deep ocean blue
  accent: '#FFB563', // Soft mango
  background: '#FFF9F2', // Warm sand
  text: '#2A2A2A',
  logo: 'https://images.unsplash.com/photo-1583395838144-08821360914b?auto=format&fit=crop&q=80&w=200&h=200', // Tropical sunset image
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