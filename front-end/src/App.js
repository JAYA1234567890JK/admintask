import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import SuperAdminDashboard from "./components/superAdminDashboard/SuperAdminDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/userDashboard/UserDashboard";
import SuperUser from "./components/superUser/SuperUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<SuperAdminDashboard />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/super-user-dashboard" element={<SuperUser />} />

        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<SuperAdminDashboard />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          <Route path="/super-user-dashboard" element={<SuperUser />} />
        </Routes>
      )}
    </>
  );
}

export default App;
