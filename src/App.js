import React, { use, useEffect } from "react";
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
import AttendanceApproval from "./components/Admin/Content/LeaveRegistration/AttendanceApproval/AttendanceApproval";
import DetailEmployee from "./components/Admin/Content/Employee/DetailEmployee/DetailEmployee";
import Login from "./components/Auth/Login/Login";
import Attendance from "./components/Admin/Content/Attendance/Attendance";
import Payroll from "./components/Admin/Content/Payroll/Payroll";
import ChangePassword from "./components/Auth/ChangePassWork/ChangePassWork";
import { useAuth } from "./components/context/AuthContext";
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
    if (user?.roles.includes("ADMIN")) {
      return <Navigate to="/dashboard" />;
    }

    if (user?.roles.includes("HR_MANAGER")) {
      return <Navigate to="/dashboard" />;
    }

    if (user?.roles.includes("DEPARTMENT_MANAGER")) {
      return <Navigate to="/manage-department" />;
    }

    //return <Navigate to="/manage-department" />;
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
            path="/dashboard"
            index
            element={
              <PrivateRoute
                element={Dashboard}
                roles={["ADMIN", "HR_MANAGER"]}
              />
            }
            //element={<Dashboard />} roles={["ADMIN", "HR_MANAGER"]}
          />

          <Route path="/change-password" element={<ChangePassword />} />

          <Route
            path="manage-workplace"
            element={<PrivateRoute element={WorkPlace} roles={["ADMIN", "HR_MANAGER"]} />}
          />

          <Route
            path="manage-department"
            element={
              <PrivateRoute
                element={Department}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-workshedule"
            element={
              <PrivateRoute
                element={WorkShedule}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-level"
            element={
              <PrivateRoute
                element={Level}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-position"
            element={<PrivateRoute element={Position} roles={["ADMIN"]} />}
          />

          <Route
            path="manage-leavedate"
            element={
              <PrivateRoute
                element={LeaveDate}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-contract"
            element={
              <PrivateRoute
                element={Contract}
                roles={["ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-employee"
            element={
              <PrivateRoute
                element={Employee}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-leaveregistration-dayoff"
            element={
              <PrivateRoute
                element={LeaveRegistrationNghiNgay}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-leaveregistration-halfdayoff"
            element={
              <PrivateRoute
                element={LeaveRegistrationNghiBuoi}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />
          <Route
            path="manage-attendance-approval"
            element={
              <PrivateRoute
                element={AttendanceApproval}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-alowance"
            element={
              <PrivateRoute
                element={Alowance}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-penalty"
            element={
              <PrivateRoute
                element={Penalty}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-attendancesetting"
            element={
              <PrivateRoute element={AttendanceSetting} roles={["ADMIN"]} />
            }
          />

          <Route
            path="pay-roll"
            element={
              <PrivateRoute
                element={Payroll}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="manage-attendance"
            element={
              <PrivateRoute
                element={Attendance}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />

          <Route
            path="detail-employee"
            element={
              <PrivateRoute
                element={DetailEmployee}
                roles={["DEPARTMENT_MANAGER", "ADMIN", "HR_MANAGER"]}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
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
