import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./LeaveDateStyle.scss";

import { getAllLeaveDate } from "../../../../services/LeaveDateService";
import ListLeaveDate from "./ListLeaveDate/ListLeaveDate";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreateLeaveDate from "./CreateLeaveDate/CreateLeaveDate";
import UpdateLeaveDate from "./UpdateLeaveDate/UpdateLeaveDate";
import DeleteLeaveDate from "./DeleteLeaveDate/DeleteLeaveDate";
import { useAuth } from "../../../context/AuthContext";

const LeaveDate = () => {
  const { user } = useAuth();

  const roleAccess = {
    view: ["ADMIN", "HR_MANAGER", "EMPLOYEE", "DEPARTMENT_MANAGER"],
    create: ["ADMIN", "HR_MANAGER"],
    update: ["ADMIN", "HR_MANAGER"],
    delete: ["ADMIN", "HR_MANAGER"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [listLeaveDate, setListLeaveDate] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [showCreate, setShowCreate] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const fetchListLeaveDate = async (SearchTerm, pageIndex, pageSize) => {
    try {
      let res = await getAllLeaveDate(SearchTerm, pageIndex, pageSize);
      setListLeaveDate(res.value.items);
      setTotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (hasPermision("view")) {
      fetchListLeaveDate(filterText, pageIndex, pageSize);
    }
  }, [pageIndex, pageSize, hasPermision("view")]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListLeaveDate(filterText, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListLeaveDate("", 1, pageSize);
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

  const handleShowUpdate = (leaveDate) => {
    setShowUpdate(true);
    setDataUpdate(leaveDate);
  };

  const handleShowDelete = (leaveDate) => {
    setShowDelete(true);
    setDataDelete(leaveDate);
  };

  return (
    <div className="leaveDate-content container">
      <div className="table-leaveDate-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên ngày nghỉ"
          />

          {hasPermision("create") && (
            <Button
              onClick={handleShowCreate}
              className="mb-2 btn btn-label btn-primary"
            >
              <FaPlus className="" /> Thêm ngày nghỉ
            </Button>
          )}
        </div>

        <ListLeaveDate
          listLeaveDate={listLeaveDate}
          handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
          handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
        />

        {hasPermision("create") && (
          <CreateLeaveDate
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            fetchListLeaveDate={fetchListLeaveDate}
          />
        )}

        {hasPermision("update") && (
          <UpdateLeaveDate
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListLeaveDate={fetchListLeaveDate}
          />
        )}

        {hasPermision("delete") && (
          <DeleteLeaveDate
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListLeaveDate={fetchListLeaveDate}
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

export default LeaveDate;
