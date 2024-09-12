import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const CreateAdmin = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminCity, setAdminCity] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:5000/task/admins", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        console.error("Failed to fetch admins");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async () => {
    if (!adminName || !adminEmail || !adminPhone || !adminCity) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    try {
      const response = await fetch("http://localhost:5000/task/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: adminName,
          email: adminEmail,
          phone: adminPhone,
          city: adminCity,
        }),
      });

      const data = await response.json();
      console.log("Admin created:", data);
      handleCloseModal();
      fetchAdmins();
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 3,
          width:"100%",
          bgcolor: "hsl(188, 50%, 25%)",
          p: 2,
        }}
      >
        <Typography variant="h4" sx = {{color:"white"}}>
          Super Admin DashBoard
        </Typography>

        <Button variant="contained" onClick={handleOpenModal}
         sx={{
            backgroundColor: "hsl(188, 25%, 68%)",
            textTransform: "capitalize",
            borderRadius:10
          }}
        >
          Create Admin
        </Button>
        <Button onClick={handleLogout} variant="contained"
         sx={{
            backgroundColor: "hsl(188, 25%, 68%)",
            textTransform: "capitalize",
            borderRadius:10
          }}
        >
          Logout
        </Button>
      </Box>

      <Typography
        variant="h6"
        sx={{ mt: 2, mb: 3, textDecoration: "underline" }}
      >
        Admin List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={fontBold}>Name</TableCell>
              <TableCell sx={fontBold}>Email</TableCell>
              <TableCell sx={fontBold}>Phone</TableCell>
              <TableCell sx={fontBold}>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins &&
              admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phone}</TableCell>
                  <TableCell>{admin.city}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6">Create Admin</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={adminPhone}
            onChange={(e) => setAdminPhone(e.target.value)}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={adminCity}
            onChange={(e) => setAdminCity(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleCreateAdmin}
            sx={{ mt: 2 }}
            fullWidth
          >
            Create Admin
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateAdmin;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fontBold ={
    fontWeight:"bold"
}
