import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  WORKSHEDULE: "WorkShedule",
};

const getAllWorkShedule = (searchTerm, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.WORKSHEDULE}`, {
    params: {
      SearchTerm: searchTerm,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};
const createWorkSchedule = (WorkSchedule) => {
  return axiosCustomize.post(`${END_POINT.WORKSHEDULE}`, WorkSchedule);
};

const updateWorkSchedule = (id, workSchedule) => {
  return axiosCustomize.put(`${END_POINT.WORKSHEDULE}/${id}`, workSchedule, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const deleteWorkSchedule = (WorkScheduleId) => {
  return axiosCustomize.delete(`${END_POINT.WORKSHEDULE}/${WorkScheduleId}`);
};

export {
  getAllWorkShedule,
  createWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
};
