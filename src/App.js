import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Admin from "./components/User/DisplayUser/Admin";
import HomePage from "./components/User/components/Home/HomePage";
import Login from "./components/Auth/Login/Login";
import DetailEmployee from "./components/User/components/Employee/DetailEmployee/DetailEmployee";
//import PrivateRoute from "./components/User/components/PrivateRoute";

import LeaveRegistrationUser from "./components/User/components/LeaveRegistrationUser/LeaveRegistrationUser";
import ChangePassword from "./components/Auth/ChangePassWork/ChangePassWork";
import Payroll from "./components/User/components/Payroll/Payroll";
import Attendance from "./components/User/components/Attendance/Attendance";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ element: Component, roles }) => {
  const { user } = useAuth();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("token");
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }, []);
  if (roles && !roles.some((role) => user?.roles?.includes(role))) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={Admin} />}>
          <Route
            path="/user-dashboard"
            element={<PrivateRoute element={HomePage} />}
          />
          <Route
            path="/leave-registration"
            element={<PrivateRoute element={LeaveRegistrationUser} />}
          />
          <Route
            path="/pay-roll"
            element={<PrivateRoute element={Payroll} />}
          />
          <Route
            path="/attendance"
            element={<PrivateRoute element={Attendance} />}
          />
          <Route
            path="/detail-employee"
            element={<PrivateRoute element={DetailEmployee} />}
          />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
