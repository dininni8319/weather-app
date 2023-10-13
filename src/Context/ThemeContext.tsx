import { createContext, useState, useMemo, ReactNode } from 'react';

export interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}
export const ThemeContext = createContext< ThemeContextType | undefined>(undefined);


export const ThemeProvider = (
  { children }: {children: ReactNode}):ReactNode => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = useMemo(() => {
    return {
      isDarkMode,
      toggleTheme,
    };
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
