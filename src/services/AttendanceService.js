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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const checkIn = (checkin) => {
  return axiosCustomize.post(`${END_POINT.ATTENDANCE}`, checkin, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const checkOut = (checkout) => {
  return axiosCustomize.put(`${END_POINT.ATTENDANCE}`, checkout, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export { getAllAttendance, checkIn, checkOut };
