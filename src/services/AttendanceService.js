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
  });
};

export { getAllAttendance };
