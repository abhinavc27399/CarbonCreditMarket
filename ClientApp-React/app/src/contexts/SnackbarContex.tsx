import { AlertColor } from "@mui/material";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  use,
  useMemo,
} from "react";
import { Snackbar } from "../types/Snackbar";

interface SnackbarContextType {
  snackbar: { open: boolean; message: string; severity: AlertColor };
  showSnackbar: (message: string, severity: AlertColor) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<Snackbar>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message: string, severity: AlertColor) =>
    setSnackbar({ open: true, message, severity });

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const snackbarContextValue = useMemo(
    () => ({ snackbar, showSnackbar, closeSnackbar }),
    [snackbar, showSnackbar, closeSnackbar]
  );

  return (
    <SnackbarContext.Provider value={snackbarContextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};
