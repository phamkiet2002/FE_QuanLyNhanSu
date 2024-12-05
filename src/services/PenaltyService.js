import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  PENALTY: "AllowanceAndPenalties/penalties",
};

const getAllPenalty = (typeOfPenalty, workPlaceName, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.PENALTY}`, {
    params: {
      TypeOfPenalty: typeOfPenalty,
      WorkPlaceName: workPlaceName,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createPenalty = (penalty) => {
  return axiosCustomize.post(`${END_POINT.PENALTY}`, penalty);
};

const updatePenalty = (penaltyId, penalty) => {
  return axiosCustomize.put(`${END_POINT.PENALTY}/${penaltyId}`, penalty);
};

export { getAllPenalty, createPenalty, updatePenalty };
