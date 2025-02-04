import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin user từ localStorage mỗi khi component mount
    const token = sessionStorage.getItem("token");
    const userRoles = JSON.parse(sessionStorage.getItem("userRoles") || "[]");

    if (token) {
      setUser({
        token,
        roles: userRoles,
      });
    }
  }, []); // Chạy 1 lần khi component mount

  // Thêm hàm updateUser để cập nhật user state
  const updateUser = (userData) => {
    if (userData) {
      setUser(userData);
      sessionStorage.setItem("token", userData.token);
      sessionStorage.setItem("userRoles", JSON.stringify(userData.roles));
    } else {
      setUser(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userRoles");
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
