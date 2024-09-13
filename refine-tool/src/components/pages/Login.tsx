import React from "react";
import { Box, Button, TextField, Typography, Alert, Container } from "@mui/material";
import { useLogin } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { mutate, isLoading } = useLogin();
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    if (!data.name || !data.email) {
        setError("Please fill in both name and email.");
        return;
      }
    console.log("data", data);
    mutate(data, {
      onSuccess: (response) => {
        console.log("Login successful:", response);
        const role = localStorage.getItem("role");
        if (role === "Superadmin") {
          navigate("/super-admin-dashboard");
        } else if (role === "Admin") {
          navigate("/admin-dashboard");
        }else if(role === "Superuser"){
            navigate("/super-user-dashboard")
        }else if(role === "User"){
            navigate("/user-dashboard")
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError("Login failed, please try again.");
      },
    });
  };

  return (
    <Box sx={{ mt: 10 }}>
        <Container maxWidth = "xs">
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        onSubmit={onSubmit}
      >
        <TextField label="Name" name="name" fullWidth />
        <TextField label="Email" name="email" fullWidth />

        {isLoading && <span>Loading...</span>}
        <Button type="submit" variant="contained" disabled={isLoading}>
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
