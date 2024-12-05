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
const LeaveDate = () => {
  const [listLeaveDate, setListLeaveDate] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const fetchListLeaveDate = async (SearchTerm, pageIndex, pageSize) => {
    try {
      let res = await getAllLeaveDate(SearchTerm, pageIndex, pageSize);
      //console.log("API Response:", res.value.items);
      setListLeaveDate(res.value.items);
      setTotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListLeaveDate(filterText, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListLeaveDate(filterText, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListLeaveDate("", 1, pageSize);
  };

  // Hàm chuyển sang trang trước
  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  // Hàm chuyển sang trang sau
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

          <Button
            onClick={handleShowCreate}
            className="mb-2 btn btn-label btn-primary"
          >
            <FaPlus className="" /> Thêm ngày nghỉ
          </Button>
        </div>

        <ListLeaveDate
          listLeaveDate={listLeaveDate}
          handleShowUpdate={handleShowUpdate}
        />

        <CreateLeaveDate
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          fetchListLeaveDate={fetchListLeaveDate}
        />

        <UpdateLeaveDate
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          fetchListLeaveDate={fetchListLeaveDate}
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

export default LeaveDate;
