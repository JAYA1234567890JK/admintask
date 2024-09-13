import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLogout } from "@refinedev/core";
import { Outlet, Link } from "react-router-dom";

const UserDashboard: React.FC = () => {
    const { mutate: logout } = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">User Dashboard</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default UserDashboard;
