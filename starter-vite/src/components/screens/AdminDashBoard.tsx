import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authProvider from "../providers/auth-provider"; 

const AdminDashBoard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authProvider.logout({});
             navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Admin Dashboard</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default AdminDashBoard;
