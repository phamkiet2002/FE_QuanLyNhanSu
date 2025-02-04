import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ATTENDANCE: "Attendance",
};

const getAllAttendance = (pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.ATTENDANCE}`, {
    params: {
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

const getEmployeeAttendance = () => {
  return axiosCustomize.get(`${END_POINT.ATTENDANCE}/getemployeeId`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

const checkIn = (checkin) => {
  return axiosCustomize.post(`${END_POINT.ATTENDANCE}/checkin`, checkin, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

const checkOut = (checkout) => {
  return axiosCustomize.put(`${END_POINT.ATTENDANCE}/checkout`, checkout, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};
export { getAllAttendance, checkIn, checkOut, getEmployeeAttendance };
