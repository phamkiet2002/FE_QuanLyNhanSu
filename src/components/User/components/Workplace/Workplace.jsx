import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import ListWorkplace from "./ListWorkplace/ListWorkplace";
import DeleteWorkPlace from "./DeleteWorkPlace/DeleteWorkPlace";
import "./WorkplaceStyle.scss";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreateWorkPlace from "./CreateWorkPlace/CreateWorkPlace";
import UpdateWorkPlace from "./UpdateWorkPlace/UpdateWorkPlace";

const WorkPlace = () => {
  const [listWorkPlaces, setListWorkPlaces] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const navigate = useNavigate();

  const fetchListWorkPlace = async (
    SearchTerm = "null",
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllWorkPlace(SearchTerm, pageIndex, pageSize);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListWorkPlaces(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListWorkPlace(filterText, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListWorkPlace(filterText, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListWorkPlace("", 1, pageSize);
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

  const handleShowUpdate = (workplace) => {
    setShowUpdate(true);
    setDataUpdate(workplace);
  };

  const handleShowDelete = (workplace) => {
    setShowDelete(true);
    setDataDelete(workplace);
  };

  return (
    <div className="workplace-content container">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Nơi làm việc</h3>
      </div>
      <div className="table-workplace-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên điểm làm việc"
          />

          <Button
            onClick={handleShowCreate}
            className="mb-2 btn btn-label btn-primary"
          >
            <FaPlus className="" /> Thêm mới
          </Button>
        </div>

        <ListWorkplace
          listWorkPlaces={listWorkPlaces}
          handleShowUpdate={handleShowUpdate}
          handleShowDelete={handleShowDelete}
        />

        {/* Create Work Place */}
        <CreateWorkPlace
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          fetchListWorkPlace={fetchListWorkPlace}
        />

        {/* Update Work Place */}
        <UpdateWorkPlace
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          fetchListWorkPlace={fetchListWorkPlace}
        />

        <DeleteWorkPlace
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListWorkPlace={fetchListWorkPlace}
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

export default WorkPlace;
