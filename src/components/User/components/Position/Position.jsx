import React, { useState, useEffect } from "react";
import ListPosition from "./ListPosition/ListPosition";
import { getAllPosition } from "../../../../services/PositionService";
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import "./PositionStyle.scss";
import DeletePosition from "./DeletePosition/DeletePosition";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreatePosition from "./CreatePosition/CreatePosition";
import UpdatePosition from "./UpdatePosition/UpdatePosition";
const Position = () => {
  const [listPosition, setListPosition] = useState([]);
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

  const fetchListPosition = async (
    SearchTerm = "null",
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllPosition(SearchTerm, pageIndex, pageSize);
      //console.log("API Response:", res.value.items);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListPosition(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListPosition(filterText, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListPosition(filterText, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListPosition("", 1, pageSize);
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

  const handleShowUpdate = (position) => {
    setShowUpdate(true);
    setDataUpdate(position);
  };

  const handleShowDelete = (position) => {
    setShowDelete(true);
    setDataDelete(position);
  };

  return (
    <div className="position-content container">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Chức vụ</h3>
      </div>
      <div className="table-position-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên chức vụ"
          />

          <Button
            onClick={handleShowCreate}
            className="mb-2 btn btn-label btn-primary"
          >
            <FaPlus className="" /> Thêm chức vụ
          </Button>
        </div>

        <ListPosition
          listPosition={listPosition}
          handleShowUpdate={handleShowUpdate}
          handleShowDelete={handleShowDelete}
        />

        <CreatePosition
          fetchListPosition={fetchListPosition}
          showCreate={showCreate}
          setShowCreate={setShowCreate}
        />

        <UpdatePosition
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          fetchListPosition={fetchListPosition}
        />
        <DeletePosition
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListPosition={fetchListPosition}
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

export default Position;
