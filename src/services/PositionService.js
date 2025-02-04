import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  POSITION: "Position",
};

const getAllPosition = (searchTerm, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.POSITION}`, {
    params: {
      SearchTerm: searchTerm,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};
const createPosition = (position) => {
  return axiosCustomize.post(`${END_POINT.POSITION}`, position);
};

const updatePosition = (positionId, position) => {
  return axiosCustomize.put(`${END_POINT.POSITION}/${positionId}`, position);
};

const deletePosition = (positionId) => {
  return axiosCustomize.delete(`${END_POINT.POSITION}/${positionId}`);
};

export { getAllPosition, createPosition, updatePosition, deletePosition };
