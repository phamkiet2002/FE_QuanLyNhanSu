import React, { useEffect, useState } from "react";
import ListLevel from "./ListLevel/ListLevel";
import { getAllLevel } from "../../../../services/LevelService";
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./LevelStyle.scss";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreateLeve from "./CreateLevel/CreateLeve";
import UpdateLevel from "./UpdateLevel/UpdateLevel";
import DeleteLevel from "./DeleteLevel/DeleteLevel";

const Level = () => {
  const [listLevel, setListLevel] = useState([]);
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

  const fetchListLevel = async (SearchTerm = "null", pageIndex, pageSize) => {
    try {
      let res = await getAllLevel(SearchTerm, pageIndex, pageSize);
      //console.log("API Response:", res.value.items);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListLevel(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListLevel(filterText, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListLevel(filterText, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPageIndex(1);
    fetchListLevel("", 1, pageSize);
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

  const handleShowUpdate = (level) => {
    setShowUpdate(true);
    setDataUpdate(level);
  };

  const handleShowDelete = (level) => {
    setShowDelete(true);
    setDataDelete(level);
  };

  return (
    <div className="level-content container">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Level</h3>
      </div>
      <div className="table-level-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên level"
          />

          <Button
            onClick={handleShowCreate}
            className="mb-2 btn btn-label btn-primary"
          >
            <FaPlus className="" /> Thêm mới
          </Button>
        </div>

        <ListLevel
          listLevel={listLevel}
          handleShowUpdate={handleShowUpdate}
          handleShowDelete={handleShowDelete}
        />

        <CreateLeve
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          fetchListLevel={fetchListLevel}
        />

        <UpdateLevel
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          fetchListLevel={fetchListLevel}
        />

        <DeleteLevel
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListLevel={fetchListLevel}
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

export default Level;
