import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !name) {
      setError("Please provide both name and email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/task/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        const { role } = data.user;
        const userDetails = { email: data.user.email, name: data.user.name };

        redirectToDashboard(role, userDetails);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      redirectToDashboard(role);
    }
  }, [navigate]);

  // Function to redirect based on role
  const redirectToDashboard = (role, userDetails) => {
    if (role === "Superadmin") {
      navigate("/dashboard");
    } else if (role === "Admin") {
      navigate("/admin-dashboard");
    } else if (role === "User") {
      navigate("/user-dashboard", { state: { userDetails: userDetails } });
    } else if (role === "Superuser") {
      navigate("/super-user-dashboard", {
        state: { userDetails: userDetails },
      });
    }
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="xs">
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
