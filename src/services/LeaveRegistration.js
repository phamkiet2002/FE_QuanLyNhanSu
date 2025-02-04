import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  LEAVEREGISTRATIONDAYOFF: "LeaveRegistration/dayoff",
  LEAVEREGISTRATIONHALFDAYOFF: "LeaveRegistration/halfdayoff",
};

const getAllLeaveRegistrationDayOff = (
  searchTerm,
  pendingApproval,
  pageIndex,
  pageSize
) => {
  return axiosCustomize.get(`${END_POINT.LEAVEREGISTRATIONDAYOFF}`, {
    params: {
      SearchTerm: searchTerm,
      PendingApproval: pendingApproval,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const getAllLeaveRegistrationHalfDayOff = (
  searchTerm,
  pendingApproval,
  pageIndex,
  pageSize
) => {
  return axiosCustomize.get(`${END_POINT.LEAVEREGISTRATIONHALFDAYOFF}`, {
    params: {
      SearchTerm: searchTerm,
      PendingApproval: pendingApproval,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createLeaveRegistrationDayOff = (leaveRegistration) => {
  return axiosCustomize.post(
    `${END_POINT.LEAVEREGISTRATIONDAYOFF}`,
    leaveRegistration
  );
};

const createLeaveRegistrationHalfDayOff = (leaveRegistration) => {
  return axiosCustomize.post(
    `${END_POINT.LEAVEREGISTRATIONHALFDAYOFF}`,
    leaveRegistration
  );
};

export {
  getAllLeaveRegistrationDayOff,
  getAllLeaveRegistrationHalfDayOff,
  createLeaveRegistrationDayOff,
  createLeaveRegistrationHalfDayOff,
};
