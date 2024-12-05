import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Admin/Header/Header";
import { Outlet } from "react-router-dom";
import Admin from "./components/Admin/DisplayAdmin/Admin";
import Dashboard from "./components/Admin/Content/Dashboard/Dashboard";
import "./App.scss";
import WorkPlace from "./components/Admin/Content/Workplace/Workplace";
import Department from "./components/Admin/Content/Department/Department";
import WorkShedule from "./components/Admin/Content/WorkShedule/WorkShedule";
import Level from "./components/Admin/Content/Level/Level";
import Position from "./components/Admin/Content/Position/Position";
import Contract from "./components/Admin/Content/Contract/Contract";
import Employee from "./components/Admin/Content/Employee/Employee";
import LeaveRegistrationNghiNgay from "./components/Admin/Content/LeaveRegistration/LeaveRegistrationNghiNgay/LeaveRegistrationNghiNgay";
import LeaveRegistrationNghiBuoi from "./components/Admin/Content/LeaveRegistration/LeaveRegistrationNghiBuoi/LeaveRegistrationNghiBuoi";
import Alowance from "./components/Admin/Content/SalaryConfigurate/AlowanceConfiguration/Alowance";
import Penalty from "./components/Admin/Content/SalaryConfigurate/PenaltyConfiguration/Penalty";
import LeaveDate from "./components/Admin/Content/LeaveDate/LeaveDate";
import AttendanceSetting from "./components/Admin/Content/SalaryConfigurate/AttendanceSettingConfiguration/AttendanceSetting";
import DetailEmployee from "./components/Admin/Content/Employee/DetailEmployee/DetailEmployee";
import Login from "./components/Auth/Login/Login";
import Attendance from "./components/Admin/Content/Attendance/Attendance";

const PrivateRoute = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem("token"); // Assuming you store JWT token in localStorage after login
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
              {" "}
              <Admin />{" "}
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-workplace" element={<WorkPlace />} />
          <Route path="manage-department" element={<Department />} />
          <Route path="manage-workshedule" element={<WorkShedule />} />
          <Route path="manage-level" element={<Level />} />
          <Route path="manage-position" element={<Position />} />
          <Route path="manage-leavedate" element={<LeaveDate />} />
          <Route path="manage-contract" element={<Contract />} />
          <Route path="manage-employee" element={<Employee />} />
          <Route
            path="manage-leaveregistration-dayoff"
            element={<LeaveRegistrationNghiNgay />}
          />
          <Route
            path="manage-leaveregistration-halfdayoff"
            element={<LeaveRegistrationNghiBuoi />}
          />
          <Route path="manage-alowance" element={<Alowance />} />
          <Route path="manage-penalty" element={<Penalty />} />
          <Route
            path="manage-attendancesetting"
            element={<AttendanceSetting />}
          />
          <Route path="manage-attendance" element={<Attendance />} />
          <Route path="/detail-employee" element={<DetailEmployee />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
