import React, { useEffect, useState } from "react";
import "./LoginStyle.scss";
import { Icon } from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { createLogin } from "../../../services/LoginService";
import { useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logobado from "../../../assets/logobado.svg";
import { useAuth } from "../../context/AuthContext";
import NotificationService from "../../../services/NotificationService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      const loginData = {
        email: email.trim(),
        password: password.trim(),
      };

      const res = await createLogin(loginData);

      if (res && res.token && res.token.value) {
        const token = res.token.value.password;
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const userRoles =
          payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || [];

        if (
          userRoles.includes("EMPLOYEE") &&
          !["ADMIN", "DEPARTMENT_MANAGER", "HR_MANAGER"].some((role) =>
            userRoles.includes(role)
          )
        ) {
          toast.error("Nhân viên không thể truy cập vào trang quản lý");
          return;
        }
        updateUser({
          token,
          roles: userRoles,
          userName: res.token.value.userName,
          email: payload.email,
          userId: payload.sub,
          employeeId: payload.EmployeeId,
        });

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userName", res.token.value.userName);
        sessionStorage.setItem("email", payload.email);
        sessionStorage.setItem("userId", payload.sub);
        sessionStorage.setItem("employeeId", payload.EmployeeId);
        sessionStorage.setItem("userRoles", JSON.stringify(userRoles));

        // localStorage.setItem("token", token);
        // localStorage.setItem("userName", res.token.value.userName);
        // localStorage.setItem("email", payload.email);
        // localStorage.setItem("userId", payload.sub);
        // localStorage.setItem("employeeId", payload.EmployeeId);
        // localStorage.setItem("userRoles", JSON.stringify(userRoles));

        NotificationService.connect();

        toast.success("Đăng nhập thành công!");
        if (userRoles.includes("ADMIN")) {
          navigate("/dashboard");
        }
        if (userRoles.includes("HR_MANAGER")) {
          navigate("/dashboard");
        }
        if (userRoles.includes("DEPARTMENT_MANAGER")) {
          navigate("/manage-department");
        }
      } else {
        toast.error("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            if (
              error.response.data?.detail ===
              "The value of a failure result can not be accessed."
            ) {
              toast.error("Email không đúng");
            } else {
              toast.error("Lỗi máy chủ, vui lòng thử lại sau");
            }
            break;
          case 400:
            toast.error("Thông tin đăng nhập không hợp lệ");
            break;
          default:
            if (error.response.data?.message === "Invalid login attempt.") {
              toast.error("Email hoặc mật khẩu không chính xác");
            } else {
              toast.error(
                error.response.data?.message ||
                "Lỗi đăng nhập, vui lòng thử lại"
              );
            }
        }
      } else {
        toast.error("Không thể kết nối đến server");
      }
    }
  };


  return (
    <div className="login-pages">
      <div className="logo-auth">
        <div className="auth-line"> </div>
        <img src={logobado} height="90px" width="100%"></img>
      </div>
      <div className="login-container">
        <div className="login-form">
          <div className="login-form-title bg-light">
            <div className="row">
              <div className="col-7 col-left">
                <div className="text-form px-4 py-3">
                  <h1>Đăng nhập</h1>
                </div>
              </div>
              <div className="col-5 col-right">
                <img
                  src="https://hrm.ipos.vn/img/profile-img.ba4e037e.png"
                  className="img-fluid"
                  alt="login"
                />
              </div>
            </div>
          </div>
          <div className="card-body pt-0 mt-4">
            <form onSubmit={handleLogin} className="row g-3">
              <div className="row row-email">
                <div className="col-lg-12">
                  <div className="form-group mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        id="email"
                        required
                        className="form-control height44 font-size-15"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email" className="label-email">
                        Email
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2 row-passwork">
                <div className="col-lg-12">
                  <div className="d-flex">
                    <div className="form-group mb-0">
                      <div className="form-floating">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="pwd"
                          required
                          className="form-control height44 font-size-15 input-password-border"
                          placeholder=" "
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="pwd" className="label-password">
                          Mật khẩu
                        </label>
                      </div>
                    </div>
                    <div
                      className="group-eys-pw"
                      onClick={togglePasswordVisibility}
                    >
                      <Icon
                        path={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
                        size={0.9}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <a
                href="#"
                className="text-muted font-size-15 d-flex align-items-center justify-content-end"
              >
                <span>Đổi mật khẩu</span>
              </a> */}
              <div className="row row-login mt-3">
                <div className="col-lg-12">
                  <div className="form-group mb-0">
                    <button type="submit" className="btn w-100 btn-primary">
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
