import React, {
  createContext,
  useState,
  useContext,
  use,
  useMemo,
} from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

const ThemeContext = createContext<any>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background: "#1f5d40",
          },
        },
      },
    },
  });

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const themeContextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {/* Wrap the children with the MuiThemeProvider to apply the theme */}
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
