import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import ExploreCarbonCredits from "../components/ExploreCertificates";

export const HomePage = () => {
  const { user } = useAuth();
  const [hasStarted, setHasStarted] = useState<boolean>();

  const handleGetStarted = () => {
    setHasStarted(true);
  };

  return !hasStarted ? (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}
    >
      <Typography>
        Welcome, {user?.name}! Explore Carbon Credit Certificates before they
        retire!
      </Typography>
      <Button variant="contained" onClick={handleGetStarted}>
        Get Started
      </Button>
    </Box>
  ) : (
    <Box>
      <ExploreCarbonCredits/>
    </Box>
  );
};
