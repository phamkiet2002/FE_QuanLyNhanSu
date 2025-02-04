import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ALOWANCE: "AllowanceAndPenalties/allowance",
  ALOWANCEANDPENALTIES: "AllowanceAndPenalties/allowanceAndPenalties",
};

const getAllAlowance = (
  typeOfAllowance,
  workPlaceName,
  pageIndex,
  pageSize
) => {
  return axiosCustomize.get(`${END_POINT.ALOWANCE}`, {
    params: {
      TypeOfAllowance: typeOfAllowance,
      WorkPlaceName: workPlaceName,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createAlowance = (alowance) => {
  return axiosCustomize.post(`${END_POINT.ALOWANCE}`, alowance);
};

const updateAlowance = (allowanceId, allowance) => {
  return axiosCustomize.put(`${END_POINT.ALOWANCE}/${allowanceId}`, allowance);
};

const deleteAlowance = (allowanceId) => {
  return axiosCustomize.delete(
    `${END_POINT.ALOWANCEANDPENALTIES}/${allowanceId}`
  );
};

export { getAllAlowance, createAlowance, updateAlowance, deleteAlowance };
