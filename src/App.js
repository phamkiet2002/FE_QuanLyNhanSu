import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Admin from "./components/User/DisplayUser/Admin";
import HomePage from "./components/User/components/Home/HomePage";
import Login from "./components/Auth/Login/Login";

import "./App.scss";

const PrivateRoute = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem("token");

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If logged in, render child components
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="user-dashboard" element={<HomePage />} />
        </Route>

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
};

export default App;
