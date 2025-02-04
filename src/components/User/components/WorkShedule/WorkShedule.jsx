import React, { useEffect, useState } from "react";
import { getAllWorkShedule } from "../../../../services/WorkScheduleService";
import ListWorkShedule from "./ListWorkShedule/ListWorkShedule";
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import "./WorkSheduleStyle.scss";
import DeleteWorkSchedule from "./DeleteWorkSchedule/DeleteWorkSchedule";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import Pagination from "../../../Common/Pagination/Pagination";
import CreateWorkSchedule from "./CreateWorkSchedule/CreateWorkSchedule";
import UpdateWorkSchedule from "./UpdateWorkSchedule/UpdateWorkSchedule";

const WorkShedule = () => {
  const [listWorkShedule, setListWorkShedule] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const fetchListWorkSchedule = async (
    SearchTerm = "null",
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllWorkShedule(SearchTerm, pageIndex, pageSize);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListWorkShedule(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListWorkSchedule(filterText, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListWorkSchedule(filterText, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListWorkSchedule("", 1, pageSize);
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

  const handleShowUpdate = (workSchedule) => {
    setShowUpdate(true);
    setDataUpdate(workSchedule);
  };

  const handleShowDelete = (workSchedule) => {
    setShowDelete(true);
    setDataDelete(workSchedule);
  };

  return (
    <div className="workshedule-content container">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Thời gian làm việc</h3>
      </div>
      <div className="table-workshedule-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
          />

          <Button
            onClick={handleShowCreate}
            className="mb-2 btn btn-label btn-primary"
          >
            <FaPlus className="" /> Thêm thời gian làm việc
          </Button>
        </div>

        <ListWorkShedule
          listWorkShedule={listWorkShedule}
          handleShowUpdate={handleShowUpdate}
          handleShowDelete={handleShowDelete}
        />

        <CreateWorkSchedule
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          fetchListWorkSchedule={fetchListWorkSchedule}
        />

        <UpdateWorkSchedule
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          fetchListWorkSchedule={fetchListWorkSchedule}
          dataUpdate={dataUpdate}
        />
        <DeleteWorkSchedule
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListWorkSchedule={fetchListWorkSchedule}
        />

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

export default WorkShedule;
