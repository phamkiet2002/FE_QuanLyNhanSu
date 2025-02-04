import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  LEAVEREGISTRATIONDAYOFF: "LeaveRegistration/dayoff",
  LEAVEREGISTRATIONHALFDAYOFF: "LeaveRegistration/halfdayoff",
  LEAVEREGISTRATION: "LeaveRegistration/employeLeaveRegistration",
  LEAVEREGISTRATION1: "LeaveRegistration/cancelleaveregistration",
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

const getEmployeeLeaveRegistration = (month, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.LEAVEREGISTRATION}`, {
    params: {
      Month: month,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

const createLeaveRegistrationDayOff = (leaveRegistration) => {
  return axiosCustomize.post(
    `${END_POINT.LEAVEREGISTRATIONDAYOFF}`,
    leaveRegistration,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};

const createLeaveRegistrationHalfDayOff = (leaveRegistration) => {
  return axiosCustomize.post(
    `${END_POINT.LEAVEREGISTRATIONHALFDAYOFF}`,
    leaveRegistration,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};

const cancelLeaveRegistration = (leaveRegistrationId) => {
  return axiosCustomize.put(
    `${END_POINT.LEAVEREGISTRATION1}/${leaveRegistrationId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};

export {
  getAllLeaveRegistrationDayOff,
  getAllLeaveRegistrationHalfDayOff,
  getEmployeeLeaveRegistration,
  createLeaveRegistrationDayOff,
  createLeaveRegistrationHalfDayOff,
  cancelLeaveRegistration,
};
