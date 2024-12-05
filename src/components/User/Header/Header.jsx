import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFlagUsa, FaBell, FaClock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Dropdown } from "react-bootstrap";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const handleLogout = () => {
    localStorage.clear();
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
            <NavLink
              to="/notifications"
              className="nav-link"
              style={{ margin: "10px" }}
            >
              <FaBell style={{ color: "white" }} />
            </NavLink>

            <div className="dropdown b-dropdown btn-group">
              <button
                aria-haspopup="true"
                aria-expanded={showDropdown}
                type="button"
                className="btn dropdown-toggle btn-black header-item hrm-header"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="https://s3-sgn10.fptcloud.com/hrm/general/2024/02/21/male_1708481802690.png"
                  alt="Header Avatar"
                  className="radius-10 header-profile-user"
                />
              </button>
              {showDropdown && (
                <ul
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    position: "absolute",
                    transform: "translate3d(-233px, 56px, 0px)",
                  }}
                >
                  <div className="d-flex align-items-center p-3">
                    <img
                      src="https://s3-sgn10.fptcloud.com/hrm/general/2024/02/21/male_1708481802690.png"
                      alt="Header Avatar"
                      className="header-profile-user"
                    />
                    <div className="name-email ms-3">
                      <span className="d-block font-weight-bold">
                        {userName}
                      </span>
                      <span className="d-block text-muted small">
                        {userEmail}
                      </span>
                    </div>
                  </div>
                  <hr className="dropdown-divider" />
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleViewProfile}
                    >
                      <span className="cursor-pointer w-100 h-100 d-flex align-items-center">
                        <i className="mdi mdi-account-circle-outline font-size-16 align-middle me-2"></i>
                        Thông tin cá nhân
                      </span>
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      <i className="mdi mdi-logout font-size-16 align-middle me-2"></i>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
