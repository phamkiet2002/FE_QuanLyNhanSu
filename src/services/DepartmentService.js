import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  DEPARTMENT: "Department",
};

const getAllDepartment = (searchTerm, workPlaceName, pageIndex, pageSize) => {
  return axiosCustomize.get(`${END_POINT.DEPARTMENT}`, {
    params: {
      SearchTerm: searchTerm,
      WorkPlaceName: workPlaceName,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const createDepartment = (department) => {
  return axiosCustomize.post(`${END_POINT.DEPARTMENT}`, department);
};

const updateDepartment = (departmentId, department) => {
  return axiosCustomize.put(
    `${END_POINT.DEPARTMENT}/${departmentId}`,
    department
  );
};

const deleteDepartment = (departmentId) => {
  return axiosCustomize.delete(`${END_POINT.DEPARTMENT}/${departmentId}`);
};

export { getAllDepartment, createDepartment, updateDepartment, deleteDepartment };
