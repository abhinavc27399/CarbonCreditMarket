import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { User } from '../types/User';
import { useAuth } from '../contexts/AuthContext';


export const SignupPage = () => {
  const { login } = useAuth();
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.name.trim()) {
      login(user);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4}}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Choose a Username"
            fullWidth
            margin="normal"
            value={user?.name}
            onChange={(e) => setUser(prevData=> ({...prevData, name: e.target.value}))}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={user?.email}
            onChange={(e) => setUser(prevData=> ({...prevData, email: e.target.value}))}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
