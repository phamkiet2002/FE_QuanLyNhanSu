import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  PENALTY: "AllowanceAndPenalties/penalties",
  ALOWANCEANDPENALTIES: "AllowanceAndPenalties/allowanceAndPenalties",
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

const deletePenalty = (penaltyId) => {
  return axiosCustomize.delete(
    `${END_POINT.ALOWANCEANDPENALTIES}/${penaltyId}`
  );
};

export { getAllPenalty, createPenalty, updatePenalty, deletePenalty };
