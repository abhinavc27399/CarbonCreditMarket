import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface LoaderContextType {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  const loaderContextValue = useMemo(
    () => ({
      loading,
      showLoader,
      hideLoader,
    }),
    [loading, showLoader, hideLoader]
  );

  return (
    <LoaderContext.Provider value={loaderContextValue}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within LoaderProvider");
  return context;
};
