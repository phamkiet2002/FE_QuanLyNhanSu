import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  STANDARDWORKINGDAY: "StandardWorkingDay",
};
const getStandardWorkingDay = () => {
  return axiosCustomize.get(`${END_POINT.STANDARDWORKINGDAY}`);
};

const updateStandardWorkingDay = (data) => {
  return axiosCustomize.put(`${END_POINT.STANDARDWORKINGDAY}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getStandardWorkingDay, updateStandardWorkingDay };
