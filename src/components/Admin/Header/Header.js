import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFlagUsa, FaBell, FaClock, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef, useCallback } from "react";
import "./Header.scss";
import NotificationDropdown from "../Content/Notification/NotificationDropdown/NotificationDropdown";
import ProfileDropdown from "../Content/ProfileDropdown/ProfileDropdown";
import {
  getNotification,
  IsReadNotification,
} from "../../../services/NotificationEntityService";

const Header = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
  const [Notification, setNotification] = useState([]);

  const fetchNotifications = useCallback(async () => {
    try {
      let res = await getNotification();
      setNotification(res.value);
    } catch (error) {
      console.error("Fetch notifications error:", error);
    }
  }, []);

  const notifications = async () => {
    try {
      let res = await getNotification();

      setNotification(res.value);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const IsRead = async (id) => {
    try {
      let res = await IsReadNotification(id);
      notifications();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    notifications();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleViewProfile = () => {
    navigate("/detail-employee");
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/locale"
              className="nav-link"
              style={{ margin: "10px" }}
            >
              <FaFlagUsa style={{ color: "white" }} />
            </NavLink>
            {/* <NavLink
              to="/manage-Leaveregistration-dayoff"
              className="nav-link"
              style={{ margin: "10px" }}
            >
              <FaBell style={{ color: "white" }} />
              <span className="badge bg-danger rounded-pill">12</span>
              
            </NavLink> */}

            <NotificationDropdown
              Notification={Notification}
              IsRead={IsRead}
              fetchNotifications={fetchNotifications}
            />

            <ProfileDropdown
              userName={userName}
              userEmail={userEmail}
              onLogout={handleLogout}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
