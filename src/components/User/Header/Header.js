import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFlagUsa } from "react-icons/fa";
import "./Header.scss";
import {
  getNotification,
  IsReadNotification,
} from "../../../services/NotificationEntityService";
import NotificationDropdown from "../components/Notification/NotificationDropdown/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown/ProfileDropdown";

const Header = () => {
  const navigate = useNavigate();
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
      await IsReadNotification(id);
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
