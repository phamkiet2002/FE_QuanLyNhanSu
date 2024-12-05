import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  CONTRACT: "Contract",
};

const getAllContract = (searchTerm, contracNumber, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.CONTRACT}`, {
    params: {
      SearchTerm: searchTerm,
      ContracNumber: contracNumber,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};
const createContract = (contract) => {
  return axiosCustomize.post(`${END_POINT.CONTRACT}`, contract);
};

const updateContract = (contractId, contract) => {
  return axiosCustomize.put(`${END_POINT.CONTRACT}/${contractId}`, contract);
};

export { getAllContract, createContract, updateContract };
