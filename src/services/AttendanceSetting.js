import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ATTENDANCESETTING: "AttendanceSetting",
};

const getAllAttendanceSetting = (status, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.ATTENDANCESETTING}`, {
    params: {
      Status: status,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createAttendanceSetting = (attendanceSetting) => {
  return axiosCustomize.post(`${END_POINT.ATTENDANCESETTING}`, attendanceSetting);
};

const updateAttendanceSetting = (attendanceSettingId, attendanceSetting) => {
  return axiosCustomize.put(`${END_POINT.ATTENDANCESETTING}/${attendanceSettingId}`, attendanceSetting);
};
const deleteAttendanceSetting = (attendanceSettingId) => {
  return axiosCustomize.delete(`${END_POINT.ATTENDANCESETTING}/${attendanceSettingId}`);
};
export { getAllAttendanceSetting, createAttendanceSetting, updateAttendanceSetting,deleteAttendanceSetting };