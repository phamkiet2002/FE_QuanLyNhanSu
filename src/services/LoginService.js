import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ACOUNT: "Account/login",
};
const createLogin = (login) => {
  return axiosCustomize.post(`${END_POINT.ACOUNT}`, login);
};

export { createLogin };
