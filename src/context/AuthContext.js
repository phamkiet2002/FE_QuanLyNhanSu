// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("userName");
    const email = sessionStorage.getItem("email");
    const userId = sessionStorage.getItem("userId");
    const employeeId = sessionStorage.getItem("employeeId");
    const userRoles = JSON.parse(sessionStorage.getItem("userRoles"));

    if (token && userName && email && userId && employeeId && userRoles) {
      return {
        token,
        userName,
        email,
        userId,
        employeeId,
        roles: userRoles,
      };
    } else {
      return null;
    }
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
