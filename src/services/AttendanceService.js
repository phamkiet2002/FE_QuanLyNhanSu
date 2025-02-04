import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ATTENDANCE: "Attendance",
};

const getAllAttendance = (workplacename, month, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.ATTENDANCE}`, {
    params: {
      WorkPlaceName: workplacename,
      Month: month,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createAttendance = (attendance) => {
  return axiosCustomize.post(
    `${END_POINT.ATTENDANCE}/checkinandcheckout`,
    attendance
  );
};
const updateAttendance = (attendance) => {
  return axiosCustomize.put(
    `${END_POINT.ATTENDANCE}/updateattendance/${attendance.id}`,
    attendance
  );
};
const updateOvertimeOutsideWorkHours = (attendance) => {
  return axiosCustomize.put(
    `${END_POINT.ATTENDANCE}/overtimeOutsideWorkHours/${attendance.id}`,
    attendance
  );
};
const updateAbsent = (attendance) => {
  return axiosCustomize.put(
    `${END_POINT.ATTENDANCE}/updateAbsent/${attendance.id}`,
    attendance
  );
};

export {
  getAllAttendance,
  createAttendance,
  updateAttendance,
  updateOvertimeOutsideWorkHours,
  updateAbsent,
};
