import { 
  createContext, 
  useState, 
  useMemo,
  ReactElement 
} from 'react';

export interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = (
  { children }: { children: ReactElement }
):ReactElement => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = useMemo(() => {
    return {
      isDarkMode,
      toggleTheme,
    }
  },[isDarkMode])
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
