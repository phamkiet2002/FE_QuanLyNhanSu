import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  REPORT: "Report",
};
const getAttendanceReport = (workplacename, month, pageindex, pagesize) => {
  return axiosCustomize.get(`${END_POINT.REPORT}/export-attendance`, {
    params: {
      WorkPlaceName: workplacename,
      Month: month,
      PageIndex: pageindex,
      PageSize: pagesize,
    },
    responseType: "blob",
  });
};
const getPayrollReport = (workplacename, month, pageindex, pagesize) => {
  return axiosCustomize.get(`${END_POINT.REPORT}/export-payroll`, {
    params: {
      WorkPlaceName: workplacename,
      Month: month,
      PageIndex: pageindex,
      PageSize: pagesize,
    },
    responseType: "blob",
  });
};

const getEmployeeReport = (
  workPlaceName,
  departmentName,
  positionName,
  levelName,
  pageindex,
  pagesize
) => {
  return axiosCustomize.get(`${END_POINT.REPORT}/export-employee`, {
    params: {
      WorkPlaceName: workPlaceName,
      DepartmentName: departmentName,
      PositionName: positionName,
      LevelName: levelName,
      PageIndex: pageindex,
      PageSize: pagesize,
    },
    responseType: "blob",
  });
};

export { getAttendanceReport, getPayrollReport, getEmployeeReport };
