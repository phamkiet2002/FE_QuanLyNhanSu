import "./Admin.scss";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import logoBado from "../../../assets/logobado.svg";
import NotificationComponent from "../components/Notification/Notification";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItemTitles = {
    "/user-dashboard": "Home",
  };

  return (
    <div className="admin-container">
      <NotificationComponent />
      <div className="admin-content">
        <div className="admin-header">
          <img
            src={logoBado}
            alt="Logo Bado"
            className="logo-bado"
            style={{ width: "auto", height: "45px" }}
          />

          <div className="admin-nav d-flex ">
            <Header />
          </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
        <div className="admin-footer">
          <p>© 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;