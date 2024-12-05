import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  ALOWANCE: "AllowanceAndPenalties/allowance",
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

export { getAllAlowance, createAlowance,updateAlowance };
