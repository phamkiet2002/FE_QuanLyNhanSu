import Sidebar from "../Sidebar/Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Sidebar/Sidebar.scss";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
const Admin = (props) => {
  //thu togle sidebar
  const [collapsed, setCollapsed] = useState(false);

  const { image, toggled, handleToggleSidebar } = props;
  const location = useLocation();
  const menuItemTitles = {
    "/": "Dashboard",
    "/manage-workplace": "Điểm làm việc",
    "/manage-department": "Phòng ban",
    "/manage-workshedule": "Thời gian làm việc",
    "/manage-level": "Level",
    "/manage-position": "Position",
    "/manage-leavedate": "Leave Date",
    "/manage-contract": "Contract",
    "/manage-employee": "Employee",
    "/manage-Leaveregistration-dayoff": "Nghỉ ngày",
    "/manage-Leaveregistration-halfdayoff": "Nghỉ buổi",
    "/manage-alowance": "Cấu hình phụ cấp",
    "/manage-penalty": "Cấu hình phạt",
    "/manage-attendancesetting": "Cấu hình chấm công",
    "/manage-attendance": "Chấm công",
    "/detail-employee": "Chi tiết nhân viên",
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content ">
        <div className={`admin-header ${collapsed ? "collapsed" : ""}`}>
          <div className="admin-toggle px-3 font-size-16 header-item text-white">
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </div>
          <div className="admin-namepage d-none d-md-flex align-items-center text-white font-size-16 text-uppercase">
            {menuItemTitles[location.pathname] || "Default Title"}
          </div>
          <div className="admin-nav d-flex ">
            <Header />
          </div>
        </div>

        <div className={`admin-main ${collapsed ? "collapsed" : ""}`}>
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};
export default Admin;
