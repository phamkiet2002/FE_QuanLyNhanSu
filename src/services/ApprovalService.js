import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  APPROVEL: "Approvel",
};

const approveLeaveRegistration = (id, approvalNote = "", pendingApproval) => {
  return axiosCustomize.put(
    `${END_POINT.APPROVEL}/leave-registration/approvel/${id}`,
    {
      id: id,
      approvalNote: approvalNote,
      pendingApproval: pendingApproval,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};
const approveAttendance = (
  id,
  approvalNote = "",
  pendingApproval,
  isLate,
  isEarlyLeave
) => {
  return axiosCustomize.put(
    `${END_POINT.APPROVEL}/attendance/approvel/${id}`,
    {
      id: id,
      pendingApproval: pendingApproval,
      approvalNote: approvalNote,
      isLate: isLate,
      isEarlyLeave: isEarlyLeave,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};

export { approveLeaveRegistration, approveAttendance };
