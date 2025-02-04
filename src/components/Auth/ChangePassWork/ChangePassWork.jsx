import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassWork } from "../../../services/LoginService";
import { Icon } from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import "./ChangePassWorkStyle.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 32) {
      toast.error("Mật khẩu phải từ 8 đến 32 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    const data = {
      password: oldPassword,
      newPassword: newPassword,
    };

    try {
      const res = await changePassWork(data);
      if (res.message === "Successful.") {
        toast.success("Đổi mật khẩu thành công");
        navigate("/login");
      } else {
        toast.error(res.detail || "Đổi mật khẩu thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi đổi mật khẩu");
    }
  };

  return (
    <div className="change-password-page">
      <div className="container">
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label>Mật khẩu cũ</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <Icon
                path={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
                size={1}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Icon
                path={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
                size={1}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Icon
                path={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
                size={1}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <div className="form-group">
            <label></label>
            <div className="password-input">
              <button type="submit" className="btn btn-primary">
                Đồng ý
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
