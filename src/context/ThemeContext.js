import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { lightTheme, darkTheme } from '../utils/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const theme = useMemo(() => {
    return darkMode ? darkTheme : lightTheme;
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = 'rgb(102, 102, 101)';
      document.body.style.color = '#FFFFFF';
    } else {
      document.body.style.backgroundColor = '#F8F4E9';
      document.body.style.color = '#2C2C2C';
    }
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}