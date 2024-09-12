import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import GetUserAndSuperuser from "../getUserAndSupreuser/GetUserAndSuperuser";
import { useNavigate } from "react-router-dom";
const CreateUserOrSuperuser = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userRole, setUserRole] = useState("Superuser");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [superusers, setSuperusers] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    if (!userName || !userEmail || !userPhone || !userCity) {
      setError("Please fill in all fields."); // Set error message
      return;
    }

    setError("");
    try {
      const response = await fetch("http://localhost:5000/task/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phone: userPhone,
          city: userCity,
          role: userRole,
        }),
      });

      const data = await response.json();
      if (response.status === 400 && data.message === "User email already exists") {
        setError("User email already exists.");
      }
      else if (response.ok) {
        setUserName("")
        setUserEmail("")
        setUserPhone("")
        setUserCity("")
        fetchSuperusers();
        fetchUsers();
        console.log(`${userRole} created:`, data);
        handleCloseModal();
      } else {
        console.error(`Failed to create ${userRole}`);
      }
    } catch (error) {
      console.error(`Error creating ${userRole}:`, error);
    }
  };

  const fetchSuperusers = async () => {
    try {
      const response = await fetch("http://localhost:5000/task/superusers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setSuperusers(data);
    } catch (error) {
      console.error("Error fetching superusers:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/task/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchSuperusers();
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();

  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyContent: "space-around",
          bgcolor: "hsl(188, 50%, 25%)",
          p: 2,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", color: "#fff" }}>
          User Management Dashboard
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            backgroundColor: "hsl(188, 25%, 68%)",
            textTransform: "capitalize",
            borderRadius:10
          }}
        >
          Create User or Superuser
        </Button>
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: "hsl(188, 25%, 68%)",
            textTransform: "capitalize",
            borderRadius:10

          }}
          variant="contained"
        >
          Logout
        </Button>
      </Box>
      <GetUserAndSuperuser superusers={superusers} users={users} />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6">Create User or Superuser</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={userCity}
            onChange={(e) => setUserCity(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <MenuItem value="Superuser">Superuser</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleCreateUser}
            sx={{ mt: 2 }}
            fullWidth
          >
            {userRole}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateUserOrSuperuser;

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


