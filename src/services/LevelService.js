import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  LEVEL: "Level",
};

const getAllLevel = (searchTerm, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.LEVEL}`, {
    params: {
      SearchTerm: searchTerm,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createLevel = (level) => {
  return axiosCustomize.post(`${END_POINT.LEVEL}`, level);
};
const updateLevel = (levelId, level) => {
  return axiosCustomize.put(`${END_POINT.LEVEL}/${levelId}`, level);
};

const deleteLevel = (levelId) => {
  return axiosCustomize.delete(`${END_POINT.LEVEL}/${levelId}`);
};
export { getAllLevel, createLevel, updateLevel, deleteLevel };
