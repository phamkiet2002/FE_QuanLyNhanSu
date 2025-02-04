import React, { useEffect, useState } from "react";
import ListAttendanceSetting from "./ListAttendanceSetting/ListAttendanceSetting";
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import "./AttendanceSettingStyle.scss";
import { useNavigate } from "react-router-dom";
import { getAllAttendanceSetting } from "../../../../../services/AttendanceSetting";
import Pagination from "../../../../Common/Pagination/Pagination";
import Fillter from "./Fillter/Fillter";
import CreateAttendanceSetting from "./CreateAttendanceSetting/CreateAttendanceSetting";
import UpdateAttendanceSetting from "./UpdateAttendanceSetting/UpdateAttendanceSetting";
import DeleteAttendanSetting from "./DeleteAttendanceSetting/DeleteAttendanceSetting";

const AttendanceSetting = () => {
  const [listAttendanceSetting, setListAttendanceSetting] = useState([]);

  const [status, setStatus] = useState("0");

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const navigate = useNavigate();

  const fetchListAttendanceSetting = async (
    status = null,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllAttendanceSetting(status, pageIndex, pageSize);
      //console.log("API Response:", res.value.items);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListAttendanceSetting(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListAttendanceSetting(status, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListAttendanceSetting(status, 1, pageSize);
  };

  const handleClear = () => {
    setPageIndex(1);
    setStatus(0);
    fetchListAttendanceSetting("0", 1, pageSize);
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

  const handleShowUpdate = (attendanceSetting) => {
    setShowUpdate(true);
    setDataUpdate(attendanceSetting);
  };

  const handleShowDelete = (attendanceSetting) => {
    setShowDelete(true);
    setDataDelete(attendanceSetting);
  };

  return (
    <div className="position-content container">
       <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Cấu hình chấm công</h3>
      </div>
      <div className="table-position-container">
        <div className="wrap_fillter">
          <Fillter
            status={status}
            setStatus={setStatus}
            handleFilter={handleFilter}
            handleClear={handleClear}
          />

          <Button
            onClick={handleShowCreate}
            className="mb-2 btn btn-label btn-primary"
          >
            <FaPlus className="" /> Thêm mới
          </Button>
        </div>

        <ListAttendanceSetting
          listAttendanceSetting={listAttendanceSetting}
          handleShowUpdate={handleShowUpdate}
          handleShowDelete={handleShowDelete}
        />

        <CreateAttendanceSetting
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          fetchListAttendanceSetting={fetchListAttendanceSetting}
        />

        <UpdateAttendanceSetting
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          fetchListAttendanceSetting={fetchListAttendanceSetting}
        />
        <DeleteAttendanSetting
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListAttendanceSetting={fetchListAttendanceSetting}
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

export default AttendanceSetting;
