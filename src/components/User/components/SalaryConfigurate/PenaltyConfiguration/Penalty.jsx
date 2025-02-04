import React, { useEffect, useState } from "react";
import ListPenalty from "./ListPenalty/ListPenalty";
import { getAllPenalty } from "../../../../../services/PenaltyService";
import Fillter from "./Fillter/Fillter";
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import "./PenaltyStyle.scss";
import Pagination from "../../../../Common/Pagination/Pagination";
import { getAllWorkPlace } from "../../../../../services/WorkplaceService";
import { getAllTypeOfPenalty } from "../../../../../services/EnumService";
import CreatePenalty from "./CreatePenalty/CreatePenalty";
import UpdatePenalty from "./UpdatePenalty/UpdatePenalty";
import DeletePenalty from "./DeletePenalty/DeletePenalty";
const Penalty = () => {
  const [listPenalty, setListPenalty] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);

  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");

  const [typeOfPenalty, setTypeOfPenalty] = useState([]);
  const [selectedTypeOfPenalty, setSelectedTypeOfPenalty] = useState("");

  const [showCreate, setShowCreate] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const navigate = useNavigate();

  const loaiPhat = {
    0: "Đi muộn",
    1: "Về sớm",
    2: "Tự nghỉ không phép",
    3: "Nghỉ quá ngày phép",
  };

  const fetchListPenalty = async (
    selectedTypeOfPenalty = null,
    selectedWorkPlace,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllPenalty(
        selectedTypeOfPenalty,
        selectedWorkPlace,
        pageIndex,
        pageSize
      );
      //console.log("API Response Alowance:", res);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListPenalty(res.value.items);
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

  const fetchEnumTypeOfPenalty = async () => {
    try {
      let res = await getAllTypeOfPenalty();
      setTypeOfPenalty(res.value);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListPenalty(
      selectedTypeOfPenalty,
      selectedWorkPlace,
      pageIndex,
      pageSize
    );
    fetchWorkPlace();
    fetchEnumTypeOfPenalty();
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListPenalty(
      selectedTypeOfPenalty,
      selectedWorkPlace,
      pageIndex,
      pageSize
    );
  };

  const handleClear = () => {
    setSelectedTypeOfPenalty("");
    setSelectedWorkPlace("");
    setPageIndex(1);
    fetchListPenalty("", "", 1, pageSize);
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

  const handleShowUpdate = (penalty) => {
    setShowUpdate(true);
    setDataUpdate(penalty);
  };

  const handleShowDelete = (penalty) => {
    setShowDelete(true);
    setDataDelete(penalty);
  };

  return (
    <div className="penalty-content container">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/user-dashboard")}
        />
        <h3 className="mb-0">Phạt</h3>
      </div>
      <div className="table-penalty-container">
        <div className="wrap_fillter">
          <Fillter
            loaiPhat={loaiPhat}
            typeOfPenalty={typeOfPenalty}
            selectedTypeOfPenalty={selectedTypeOfPenalty}
            setSelectedTypeOfPenalty={setSelectedTypeOfPenalty}
            workPlaces={workPlaces}
            selectedWorkPlace={selectedWorkPlace}
            setSelectedWorkPlace={setSelectedWorkPlace}
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

        <ListPenalty
          listPenalty={listPenalty}
          handleShowUpdate={handleShowUpdate}
          handleShowDelete={handleShowDelete}
        />

        <CreatePenalty
          loaiPhat={loaiPhat}
          typeOfPenalty1={typeOfPenalty}
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          workPlaces={workPlaces}
          fetchListPenalty={fetchListPenalty}
        />

        <UpdatePenalty
          showUpdate={showUpdate}
          loaiPhat={loaiPhat}
          workPlaces={workPlaces}
          typeOfPenalty={typeOfPenalty}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          fetchListPenalty={fetchListPenalty}
        />
        <DeletePenalty
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListPenalty={fetchListPenalty}
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

export default Penalty;
