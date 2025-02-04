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
import NotificationComponent from "../Content/Notification/Notification";
const Admin = (props) => {
  //thu togle sidebar
  const [collapsed, setCollapsed] = useState(false);

  const { image, toggled, handleToggleSidebar } = props;
  const location = useLocation();
  const menuItemTitles = {
    "/": " Tổng quan",
    "/manage-workplace": "Điểm làm việc",
    "/manage-department": "Phòng ban",
    "/manage-workshedule": "Thời gian làm việc",
    "/manage-level": "Level",
    "/manage-position": "Chức vụ",
    "/manage-leavedate": "Ngày nghỉ",
    "/manage-contract": "Hợp đồng",
    "/manage-employee": "Nhân viên",
    "/manage-Leaveregistration-dayoff": "Nghỉ ngày",
    "/manage-Leaveregistration-halfdayoff": "Nghỉ buổi",
    "/manage-alowance": "Cấu hình phụ cấp",
    "/manage-penalty": "Cấu hình phạt",
    "/manage-attendancesetting": "Cấu hình chấm công",
    "/manage-attendance": "Chấm công",
    "/detail-employee": "Chi tiết nhân viên",
    "/pay-roll": "Bảng lương",
    "/manage-standard-working": "Cấu hình công chuẩn",
    "/change-password": "Đổi mật khẩu",
    "/manage-attendance-approval": "Duyệt chấm công",
    "/dashboard": "Tổng quan",
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content ">
        <NotificationComponent />
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
    </div>
  );
};
export default Admin;
