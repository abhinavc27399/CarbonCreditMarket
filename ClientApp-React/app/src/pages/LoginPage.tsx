import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { User } from "../types/User";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import { useSnackbar } from "../contexts/SnackbarContex";

export const LoginPage = () => {
  const { login } = useAuth();
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });
  const { showSnackbar } = useSnackbar();
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      showSnackbar('Please enter a username.', 'error');
      return;
    }
    showLoader();
    setTimeout(() => { // simulate API call
      login(user);
      hideLoader();
      showSnackbar('Login successful!', 'success');
      navigate('/');
    }, 1500);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4}}>
        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={user?.name}
            onChange={(e) =>
              setUser((prevData) => ({ ...prevData, name: e.target.value }))
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={user?.email}
            onChange={(e) =>
              setUser((prevData) => ({ ...prevData, email: e.target.value }))
            }
          />
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            Log In
          </Button>
        </Box>
        <Box textAlign="center">
          <Typography margin={1} variant="body2">Don't have an account?</Typography>
          <Button onClick={()=>{navigate("/signup")}} variant="contained">
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
