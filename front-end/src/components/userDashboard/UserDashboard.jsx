import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const UserDashboard = () => {
  const location = useLocation();
  const { name, email } = location.state?.userDetails || {};
  const navigate = useNavigate();
  console.log(name);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          bgcolor: "hsl(188, 50%, 25%)",
          p: 2,
        }}
      >
        <Typography sx={{ color: "white", fontSize: 20 }}>
          User DashBoard
        </Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            backgroundColor: "hsl(188, 25%, 68%)",
            textTransform: "capitalize",
            borderRadius: 10,
          }}
        >
          Logout
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          mt: 5,
        }}
      >
        <Typography sx={{ fontSize: 16 }}>Name :{name}</Typography>
        <Typography sx={{ fontSize: 16 }}>Eamil :{email}</Typography>
      </Box>
    </>
  );
};
export default UserDashboard;
