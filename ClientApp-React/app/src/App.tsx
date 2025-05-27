import React from "react";
import "./App.css";
import {useAuth } from "./contexts/AuthContext";
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSnackbar } from "./contexts/SnackbarContex";
import { useLoader } from "./contexts/LoaderContext";
import { AppBar, Toolbar, Typography, Container, CircularProgress, Snackbar, Alert, Box } from "@mui/material";

/**
 *  The client side app component for carbon credit market web application
 * */
const App: React.FC = () => {
  const { user } = useAuth();
  const { snackbar, closeSnackbar } = useSnackbar();
  const { loading } = useLoader();
  const location = useLocation();

  const showAppBar = !['/login', '/signup'].includes(location.pathname.toLowerCase());

  // Add Routes and common components at global level
  // Make sure to wrap this App component with the necessary context providers in main.tsx
  return ( 
    <Box display={'flex'} flexDirection={'column'}>
      {/* AppBar only when logged in */}
      {showAppBar && (
        <AppBar position="static" sx={{backgroundColor: '#1f5d40'}}>
          <Toolbar sx={{display: 'flex', flexGrow: 1}}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Carbon Credit Market
            </Typography>
            {user && (
              <Typography variant="body1">
                Welcome, {user.name}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* Main Container */}
      <Container sx={{ marginTop: showAppBar ? 4 : 8 }}>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>

      {/* Common Loader */}
      {loading && (
        <Box sx={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1300
        }}>
          <CircularProgress size={80} />
        </Box>
      )}

      {/* Common Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={closeSnackbar} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
