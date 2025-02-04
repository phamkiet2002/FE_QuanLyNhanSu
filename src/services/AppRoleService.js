import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  APPROLE: "AppRole",
};

const getAllAppRole = (pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.APPROLE}`, {
    params: {
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

export { getAllAppRole };
