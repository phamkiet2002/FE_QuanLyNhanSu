import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ACOUNT: "Account",
};
const createLogin = (login) => {
  return axiosCustomize.post(`${END_POINT.ACOUNT}/login`, login);
};
const logout = () => {
  return axiosCustomize.post(`${END_POINT.ACOUNT}/logout`);
};
const changePassWork = (data) => {
  return axiosCustomize.post(`${END_POINT.ACOUNT}/changepassword`, data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

export { createLogin, logout, changePassWork };
