import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  EMPLOYEE: "Employee",
};

const getAllEmployee = (
  searchTerm,
  workPlaceName,
  departmentName,
  positionName,
  levelName,
  pageIndex,
  pageSize
) => {
  return axiosCustomize.get(`${END_POINT.EMPLOYEE}`, {
    params: {
      SearchTerm: searchTerm,
      WorkPlaceName: workPlaceName,
      DepartmentName: departmentName,
      PositionName: positionName,
      LevelName: levelName,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const getEmployeeByMaNv = (maNv) => {
  return axiosCustomize.get(`${END_POINT.EMPLOYEE}/getmanv/${maNv}`);
};

const createEmloyee = (employee) => {
  return axiosCustomize.post(`${END_POINT.EMPLOYEE}`, employee);
};

const getEmployeeById = (employeeId) => {
  return axiosCustomize.get(`${END_POINT.EMPLOYEE}/getid`, {
    params: {
      employeeId: employeeId,
    },
  });
};

const getEmployeeLogin = () => {
  const employeeId = localStorage.getItem("employeeId");
  return axiosCustomize.get(`${END_POINT.EMPLOYEE}/getid`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getPayroll = (
  workPlaceName = "",
  month = "",
  pageIndex = 1,
  pageSize = 10
) => {
  return axiosCustomize.get(`${END_POINT.EMPLOYEE}/getpayroll`, {
    params: {
      WorkPlaceName: workPlaceName,
      Month: month,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const updateEmployeeInfo = (employeeId, employee) => {
  return axiosCustomize.put(
    `${END_POINT.EMPLOYEE}/update/${employeeId}`,
    employee
  );
};

const updateEmployeeDepartment = (employeeId, employee) => {
  return axiosCustomize.put(
    `${END_POINT.EMPLOYEE}/employeedepartment/${employeeId}`,
    employee
  );
};
const updateEmployeeSalary = (employeeId, employee) => {
  return axiosCustomize.put(
    `${END_POINT.EMPLOYEE}/employeesalary/${employeeId}`,
    employee
  );
};
const updateEmployeePosition = (employeeId, employee) => {
  return axiosCustomize.put(
    `${END_POINT.EMPLOYEE}/employeeposition/${employeeId}`,
    employee
  );
};
const updateEmployeeWorkPlace = (employeeId, employee) => {
  return axiosCustomize.put(
    `${END_POINT.EMPLOYEE}/employeeworkplace/${employeeId}`,
    employee
  );
};
const updateEmployeeLevel = (employeeId, employee) => {
  return axiosCustomize.put(
    `${END_POINT.EMPLOYEE}/employeelevel/${employeeId}`,
    employee
  );
};

export {
  getAllEmployee,
  createEmloyee,
  getEmployeeByMaNv,
  getEmployeeById,
  getEmployeeLogin,
  getPayroll,
  updateEmployeeInfo,
  updateEmployeeDepartment,
  updateEmployeeSalary,
  updateEmployeePosition,
  updateEmployeeWorkPlace,
  updateEmployeeLevel,
};
