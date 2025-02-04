import React, { useEffect, useState } from "react";
import ListContract from "./ListContract/ListContract";
import { getAllContract } from "../../../../services/ContractService";
import "./ContractStyle.scss";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import Fillter from "./Fillter/Fillter";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import Pagination from "../../../Common/Pagination/Pagination";
import CreateContract from "./CreateContract/CreateContract";
import UpdateContract from "./UpdateContract/UpdateContract";
import { useAuth } from "../../../context/AuthContext";

const Contract = () => {
  const { user } = useAuth();

  const roleAccess = {
    view: ["ADMIN", "HR_MANAGER"],
    create: ["ADMIN", "HR_MANAGER"],
    update: ["ADMIN", "HR_MANAGER"],
    delete: ["ADMIN", "HR_MANAGER"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [listContract, setListContract] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [contracNumber, setContracNumber] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);
  const [showCreate, setshowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const fetchListContract = async (
    SearchTerm = "null",
    contracNumber,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllContract(
        SearchTerm,
        contracNumber,
        pageIndex,
        pageSize
      );
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListContract(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListContract(filterText, contracNumber, pageIndex, pageSize);
  }, [pageIndex, pageSize, hasPermision("view")]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListContract(filterText, contracNumber, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setContracNumber("");
    setPageIndex(1);
    fetchListContract("", "", 1, pageSize);
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
    setshowCreate(true);
  };

  const handleShowUpdate = (contract) => {
    setShowUpdate(true);
    setDataUpdate(contract);
  };

  if (!hasPermision("view")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="contract-content container">
      <div className="table-contract-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Tìm nhân viên"
          >
            <Fillter
              contracNumber={contracNumber}
              setContracNumber={setContracNumber}
            />
          </SearchFillter>

          {hasPermision("create") && (
            <Button
              className="mb-2 btn btn-label btn-primary"
              onClick={() => handleShowCreate(true)}
            >
              <FaPlus /> Thêm hợp đồng
            </Button>
          )}
        </div>

        <ListContract
          listContract={listContract}
          handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
          setShowUpdate={setShowUpdate}
        />

        {hasPermision("create") && (
          <CreateContract
            showCreate={showCreate}
            setShowCreate={setshowCreate}
            fetchListContract={fetchListContract}
          />
        )}

        {hasPermision("update") && (
          <UpdateContract
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListContract={fetchListContract}
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

export default Contract;
