import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdVpnKey, MdAccountCircle, MdLogout } from "react-icons/md";

const ProfileDropdown = (props) => {
  const { userName, userEmail, onLogout } = props;
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    navigate("/detail-employee");
  };
  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className="dropdown b-dropdown btn-group" ref={dropdownRef}>
      <button
        aria-haspopup="true"
        aria-expanded={showDropdown}
        type="button"
        className="btn btn-black header-item hrm-header"
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
            transform: "translate3d(-185px, 56px, 0px)",
          }}
        >
          <div className="d-flex align-items-center p-3">
            <img
              src="https://s3-sgn10.fptcloud.com/hrm/general/2024/02/21/male_1708481802690.png"
              alt="Header Avatar"
              className="header-profile-user"
            />
            <div className="name-email ms-3">
              <span className="d-block font-weight-bold">{userName}</span>
              <span className="d-block text-muted small">{userEmail}</span>
            </div>
          </div>
          <hr className="dropdown-divider" />
          <li>
            <button className="dropdown-item" onClick={handleViewProfile}>
              <span className="cursor-pointer w-100 h-100 d-flex align-items-center">
                <MdAccountCircle size={16} className="me-2" />
                Thông tin cá nhân
              </span>
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={handleChangePassword}>
              <span className="cursor-pointer w-100 h-100 d-flex align-items-center">
                <MdVpnKey size={16} className="me-2" />
                Đổi mật khẩu
              </span>
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button onClick={onLogout} className="dropdown-item text-danger">
              <MdLogout className="font-size-16 align-middle me-2" />
              Đăng xuất
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
