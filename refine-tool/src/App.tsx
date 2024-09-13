import React from "react";
import { Refine, Authenticated } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import authProvider from "./components/providers/auth-provider";
import SuperAdminDashboard from "./components/screens/SuperAdminDashboard";
import { Login } from "./components/pages/Login";
import AdminDashBoard from "./components/screens/AdminDashBoard";
import SuperUserDashboard from "./components/screens/SuperUserDashboard";
import UserDashboard from "./components/screens/UserDashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine authProvider={authProvider}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/super-admin-dashboard"
            element={
              <Authenticated key="protected" fallback={<Navigate to="/" />}>
                <SuperAdminDashboard />
              </Authenticated>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <Authenticated key="protected" fallback={<Navigate to="/" />}>
                <AdminDashBoard />
              </Authenticated>
            }
          />
          <Route
            path="/super-user-dashboard"
            element={
              <Authenticated key="protected" fallback={<Navigate to="/" />}>
                <SuperUserDashboard />
              </Authenticated>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <Authenticated key="protected" fallback={<Navigate to="/" />}>
                <UserDashboard />
              </Authenticated>
            }
          />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
