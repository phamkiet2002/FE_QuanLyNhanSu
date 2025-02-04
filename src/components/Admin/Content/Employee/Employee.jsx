import React, { useEffect, useState } from "react";
import ListEmployee from "./ListEmployee/ListEmployee";
import { getAllEmployee } from "../../../../services/EmployeeService";
import Pagination from "../../../Common/Pagination/Pagination";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import { getAllDepartment } from "../../../../services/DepartmentService";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import Fillter from "./Fillter/Fillter";
import { FaFileExcel, FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./EmployeeStyle.scss";
import { getAllPosition } from "../../../../services/PositionService";
import { getAllLevel } from "../../../../services/LevelService";
import CreateEmployee from "./CreateEmployee/CreateEmployee";
import UpdateEmployeeSalary from "./UpdateEmployee/UpdateEmployeeSalary/UpdateEmployeeSalary";
import { useNavigate } from "react-router-dom";
import UpdateEmployeePosition from "./UpdateEmployee/UpdateEmployeePosition/UpdateEmployeePosition";
import UpdateEmployeeWorkplace from "./UpdateEmployee/UpdateEmployeeWorkPlace/UpdateEmployeeWorkPlace";
import UpdateEmployeeLevel from "./UpdateEmployee/UpdateEmployeeLevel/UpdateEmployeeLevel";
import UpdateEmployeeDepartment from "./UpdateEmployee/UpdateEmployeeDepartment/UpdateEmployeeDepartment";
import EmployeeLeaveWork from "./UpdateEmployee/EmployeeLeaveWork/EmployeeLeaveWork";
import { getEmployeeReport } from "../../../../services/ReportService";
import { useAuth } from "../../../context/AuthContext";

const Employee = () => {
  const { user } = useAuth();

  const roleAccess = {
    create: ["ADMIN", "HR_MANAGER"],
    update: ["ADMIN", "HR_MANAGER"],
    view: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    delete: ["ADMIN", "HR_MANAGER"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [listEmployee, setListEmployee] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);

  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [levels, setLevels] = useState([]);
  const [selectLevel, setSelectLevel] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [showUpdateSalary, setShowUpdateSalary] = useState(false);
  const [showUpdatePosition, setShowUpdatePosition] = useState(false);
  const [showUpdateWorkPlace, setShowUpdateWorkPlace] = useState(false);
  const [showUpdateLevel, setShowUpdateLevel] = useState(false);
  const [showUpdateDepartment, setShowUpdateDepartment] = useState(false);

  const [dataDetail, setDataDetail] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [Status, setStatus] = useState(0);

  const fetchListEmployee = async (
    searchTerm = "",
    selectedWorkPlace,
    selectedDepartment,
    selectedPosition,
    selectLevel,
    Status,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllEmployee(
        searchTerm,
        selectedWorkPlace,
        selectedDepartment,
        selectedPosition,
        selectLevel,
        Status,
        pageIndex,
        pageSize
      );
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListEmployee(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchWorkPlace = async () => {
    try {
      let res = await getAllWorkPlace("", 1, 100);
      setWorkPlaces(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      let res = await getAllDepartment("", "", 1, 100);
      setDepartments(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchPosition = async () => {
    try {
      let res = await getAllPosition("", 1, 100);
      setPositions(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchLevel = async () => {
    try {
      let res = await getAllLevel("", 1, 100);
      setLevels(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListEmployee(
      filterText,
      selectedWorkPlace,
      selectedDepartment,
      selectedPosition,
      selectLevel,
      Status,
      pageIndex,
      pageSize
    );
    fetchWorkPlace("", 1, 100);
    fetchDepartment("", 1, 100);
    fetchPosition("", 1, 100);
    fetchLevel("", 1, 100);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListEmployee(
      filterText,
      selectedWorkPlace,
      selectedDepartment,
      selectedPosition,
      selectLevel,
      Status,
      pageIndex,
      pageSize
    );
  };

  const handleClear = () => {
    setFilterText("");
    setSelectedWorkPlace("");
    setSelectedDepartment("");
    setSelectedPosition("");
    setSelectLevel("");
    setPageIndex(1);
    fetchListEmployee("", "", "", "", "", 0, 1, pageSize);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex((prev) => prev - 1);
    }
  };
  const handleExportExcel = async () => {
    try {
      const pageindex = pageIndex;
      const pagesize = pageSize;
      const workPlaceName = selectedWorkPlace;
      const departmentName = selectedDepartment;
      const positionName = selectedPosition;
      const levelName = selectLevel;

      const response = await getEmployeeReport(
        workPlaceName,
        departmentName,
        positionName,
        levelName,
        pageindex,
        pagesize
      );

      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Employee_Report_${workPlaceName}_${departmentName}.xlsx`
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handleNextPage = () => {
    if (pageIndex * pageSize < totalCount) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleShowDetail = (employee) => {
    setDataDetail(employee);
    setShowDetail(true);
  };

  const navigate = useNavigate();
  function DetailEmployee() {
    setEmployeeId();
    navigate(`/detail-employee`);
  }
  const handleShowUpdateEmloyeeSalary = (employee) => {
    setDataUpdate(employee);
    setShowUpdateSalary(true);
  };
  const handleShowUpdateEmloyeePosition = (employee) => {
    setDataUpdate(employee);
    setShowUpdatePosition(true);
  };

  const handleShowUpdateEmloyeeWorkPlace = (employee) => {
    setDataUpdate(employee);
    setShowUpdateWorkPlace(true);
  };

  const handleShowUpdateEmloyeeLevel = (employee) => {
    setDataUpdate(employee);
    setShowUpdateLevel(true);
  };

  const handleShowUpdateEmloyeeDepartment = (employee) => {
    setDataUpdate(employee);
    setShowUpdateDepartment(true);
  };

  const handleShowEmployeeLeaveWork = (employee) => {
    setShowDelete(true);
    setDataDelete(employee);
  };

  return (
    <div className="employee-content container">
      <div className="table-employee-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên nhân viên"
          >
            <Fillter
              workPlaces={workPlaces}
              selectedWorkPlace={selectedWorkPlace}
              setSelectedWorkPlace={setSelectedWorkPlace}
              departments={departments}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              positions={positions}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              levels={levels}
              selectLevel={selectLevel}
              setSelectLevel={setSelectLevel}
              Status={Status}
              setStatus={setStatus}
            />
          </SearchFillter>

          <div className="d-flex justify-content-end align-items-center mb-3">
            {hasPermision("view") && (
              <Button
                onClick={handleExportExcel}
                className="btn btn-sm btn-label btn-primary py-2 me-2"
              >
                <FaFileExcel
                  style={{
                    marginRight: "8px",
                    verticalAlign: "middle",
                    color: "#fff",
                  }}
                />
                Xuất Excel
              </Button>
            )}
            {hasPermision("create") && (
              <Button
                onClick={handleShowCreate}
                className="btn btn-label btn-primary "
              >
                <FaPlus className="" /> Thêm mới
              </Button>
            )}
          </div>
        </div>
        <ListEmployee
          listEmployee={listEmployee}
          handleShowDetail={handleShowDetail}
          DetailEmployee={DetailEmployee}
          handleShowUpdateEmloyeeSalary={
            hasPermision("update") ? handleShowUpdateEmloyeeSalary : null
          }
          handleShowUpdateEmloyeePosition={
            hasPermision("update") ? handleShowUpdateEmloyeePosition : null
          }
          handleShowUpdateEmloyeeWorkPlace={
            hasPermision("update") ? handleShowUpdateEmloyeeWorkPlace : null
          }
          handleShowUpdateEmloyeeLevel={
            hasPermision("update") ? handleShowUpdateEmloyeeLevel : null
          }
          handleShowUpdateEmloyeeDepartment={
            hasPermision("update") ? handleShowUpdateEmloyeeDepartment : null
          }
          handleShowEmployeeLeaveWork={
            hasPermision("delete") ? handleShowEmployeeLeaveWork : null
          }
        />
        {hasPermision("create") && (
          <CreateEmployee
            showCreate={showCreate}
            workPlaces={workPlaces}
            departments={departments}
            positions={positions}
            levels={levels}
            setShowCreate={setShowCreate}
            fetchListEmployee={fetchListEmployee}
          />
        )}
        {hasPermision("update") && (
          <>
            <UpdateEmployeeSalary
              showUpdate={showUpdateSalary}
              setShowUpdate={setShowUpdateSalary}
              dataUpdate={dataUpdate}
              fetchListEmployee={fetchListEmployee}
            />

            <UpdateEmployeePosition
              showUpdate={showUpdatePosition}
              setShowUpdate={setShowUpdatePosition}
              dataUpdate={dataUpdate}
              positions={positions}
              fetchListEmployee={fetchListEmployee}
            />

            <UpdateEmployeeWorkplace
              showUpdate={showUpdateWorkPlace}
              setShowUpdate={setShowUpdateWorkPlace}
              dataUpdate={dataUpdate}
              departments={departments}
              workPlaces={workPlaces}
              fetchListEmployee={fetchListEmployee}
            />

            <UpdateEmployeeLevel
              showUpdate={showUpdateLevel}
              setShowUpdate={setShowUpdateLevel}
              dataUpdate={dataUpdate}
              levels={levels}
              fetchListEmployee={fetchListEmployee}
            />
            <UpdateEmployeeDepartment
              showUpdate={showUpdateDepartment}
              setShowUpdate={setShowUpdateDepartment}
              dataUpdate={dataUpdate}
              departments={departments}
              fetchListEmployee={fetchListEmployee}
            />
          </>
        )}
        {hasPermision("delete") && (
          <EmployeeLeaveWork
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListEmployee={fetchListEmployee}
          />
        )}

        {/* Phân trang */}
        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Employee;
