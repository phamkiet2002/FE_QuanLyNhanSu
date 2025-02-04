import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  LEAVEDATE: "LeaveDate",
};

const getAllLeaveDate = (searchTerm, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.LEAVEDATE}`, {
    params: {
      SearchTerm: searchTerm,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createLeaveDate = (leaveDate) => {
  return axiosCustomize.post(`${END_POINT.LEAVEDATE}`, leaveDate);
};

const updateLeaveDate = (leaveDateId, leaveDate) => {
  return axiosCustomize.put(`${END_POINT.LEAVEDATE}/${leaveDateId}`, leaveDate);
};

const deleteLeaveDate = (leaveDateId) => {
  return axiosCustomize.delete(`${END_POINT.LEAVEDATE}/${leaveDateId}`);
};

export { getAllLeaveDate, createLeaveDate, updateLeaveDate, deleteLeaveDate };
