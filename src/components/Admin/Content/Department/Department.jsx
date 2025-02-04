import React, { useEffect, useState } from "react";
import ListDepartment from "./ListDepartment/ListDepartment";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import { getAllDepartment } from "../../../../services/DepartmentService";
import "./DepartmentStyle.scss";
import Pagination from "../../../Common/Pagination/Pagination";
import Fillter from "./Fillter/Fillter";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreateDepartment from "./CreateDepartment/CreateDepartment";
import UpdateDepartment from "./UpdateDepartment/UpdateDepartment";
import DeleteDepartment from "./DeleteDepartment/DeleteDepartment";
import { useAuth } from "../../../context/AuthContext";

const Department = () => {
  const { user } = useAuth();

  const roleAccess = {
    view: ["ADMIN", "DEPARTMENT_MANAGER"],
    create: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [listDepartment, setListDepartment] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [workPlaceName, setWorkPlaceName] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");

  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const fetchListDepartment = async (
    SearchTerm,
    workPlaceName,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllDepartment(
        SearchTerm,
        workPlaceName,
        pageIndex,
        pageSize
      );
      setListDepartment(res.value.items);
      setTotalCount(res.value.totalCount);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListDepartment(filterText, workPlaceName, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const fetchWorkPlace = async () => {
    try {
      let res = await getAllWorkPlace("", 1, 100);
      setWorkPlaces(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchWorkPlace();
  }, []);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListDepartment(filterText, selectedWorkPlace, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListDepartment("", "", 1, pageSize);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex * pageSize < totalCount) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleShowUpdate = (department) => {
    setShowUpdate(true);
    setDataUpdate(department);
  };

  const handleShowDelete = (department) => {
    setShowDelete(true);
    setDataDelete(department);
  };

  if (!hasPermision("view")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="department-content container">
      <div className="table-department-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên phòng ban"
          >
            <Fillter
              workPlaces={workPlaces}
              selectedWorkPlace={selectedWorkPlace}
              setSelectedWorkPlace={setSelectedWorkPlace}
            />
          </SearchFillter>

          {hasPermision("create") && (
            <Button
              onClick={handleShowCreate}
              className="mb-2 btn btn-label btn-primary"
            >
              <FaPlus className="" /> Thêm phòng ban
            </Button>
          )}
        </div>

        {hasPermision("view") && (
          <ListDepartment
            listDepartment={listDepartment}
            handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
            handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
          />
        )}

        {hasPermision("create") && (
          <CreateDepartment
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            workPlaces={workPlaces}
            fetchWorkPlace={fetchWorkPlace}
            fetchListDepartment={fetchListDepartment}
          />
        )}

        {hasPermision("update") && (
          <UpdateDepartment
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListDepartment={fetchListDepartment}
          />
        )}

        {hasPermision("delete") && (
          <DeleteDepartment
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListDepartment={fetchListDepartment}
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

export default Department;
