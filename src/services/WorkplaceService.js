import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  WORKPLACE: "WorkPlace",
};

const getAllWorkPlace = (searchTerm, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.WORKPLACE}`, {
    params: {
      SearchTerm: searchTerm,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createWorkPlace = (WorkPlace) => {
  return axiosCustomize.post(`${END_POINT.WORKPLACE}`, WorkPlace);
};

const updateWorkPlace = (workPlaceId, workplace) => {
  return axiosCustomize.put(`${END_POINT.WORKPLACE}/${workPlaceId}`, workplace);
};

const deleteWorkPlace = (workPlaceId) => {
  return axiosCustomize.delete(`${END_POINT.WORKPLACE}/${workPlaceId}`);
};

export { getAllWorkPlace, createWorkPlace, updateWorkPlace, deleteWorkPlace };
