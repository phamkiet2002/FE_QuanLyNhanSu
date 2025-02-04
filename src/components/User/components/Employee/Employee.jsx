import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListEmployee from "./ListEmployee/ListEmployee";
import Pagination from "../../../Common/Pagination/Pagination";
import { getAllEmployee } from "../../../../services/EmployeeService";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import { getAllDepartment } from "../../../../services/DepartmentService";
import { getAllPosition } from "../../../../services/PositionService";
import { getAllLevel } from "../../../../services/LevelService";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import Fillter from "./Fillter/Fillter";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Button, Col } from "react-bootstrap";
import "./EmployeeStyle.scss";
import UpdateEmployeeInfo from "./UpdateEmployee/UpdateEmployeeInfo/UpdateEmployeeInfo";
import UpdateEmployeeSalary from "./UpdateEmployee/UpdateEmployeeSalary/UpdateEmployeeSalary";
import UpdateEmployeePosition from "./UpdateEmployee/UpdateEmployeePosition/UpdateEmployeePosition";
import UpdateEmployeeWorkplace from "./UpdateEmployee/UpdateEmployeeWorkPlace/UpdateEmployeeWorkPlace";
import UpdateEmployeeLevel from "./UpdateEmployee/UpdateEmployeeLevel/UpdateEmployeeLevel";
import UpdateEmployeeDepartment from "./UpdateEmployee/UpdateEmployeeDepartment/UpdateEmployeeDepartment";
import CreateEmployee from "./CreateEmployee/CreateEmployee";

const Employee = () => {
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
  const navigate = useNavigate();
  const [dataDetail, setDataDetail] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});

  const fetchListEmployee = async (
    searchTerm = "",
    selectedWorkPlace,
    selectedDepartment,
    selectedPosition,
    selectLevel,
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
        pageIndex,
        pageSize
      );
      //console.log("API Response:", res.value.items);
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
    fetchListEmployee("", "", "", "", "", 1, pageSize);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex((prev) => prev - 1);
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

  return (
    <div className="employee-content container">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Nhân viên</h3>
      </div>
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
            />
          </SearchFillter>

          <div className="btn_create">
            <Button
              onClick={handleShowCreate}
              className="mb-2 btn btn-label btn-primary"
            >
              <FaPlus /> Thêm mới
            </Button>
          </div>
        </div>
        <ListEmployee
          listEmployee={listEmployee}
          handleShowDetail={handleShowDetail}
          DetailEmployee={DetailEmployee}
          handleShowUpdateEmloyeeSalary={handleShowUpdateEmloyeeSalary}
          handleShowUpdateEmloyeePosition={handleShowUpdateEmloyeePosition}
          handleShowUpdateEmloyeeWorkPlace={handleShowUpdateEmloyeeWorkPlace}
          handleShowUpdateEmloyeeLevel={handleShowUpdateEmloyeeLevel}
          handleShowUpdateEmloyeeDepartment={handleShowUpdateEmloyeeDepartment}
        />
        <CreateEmployee
          showCreate={showCreate}
          workPlaces={workPlaces}
          departments={departments}
          positions={positions}
          levels={levels}
          setShowCreate={setShowCreate}
          fetchListEmployee={fetchListEmployee}
        />

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
