import React, { useState, useEffect } from "react";
import ListPosition from "./ListPosition/ListPosition";
import { getAllPosition } from "../../../../services/PositionService";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./PositionStyle.scss";
import DeletePosition from "./DeletePosition/DeletePosition";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreatePosition from "./CreatePosition/CreatePosition";
import UpdatePosition from "./UpdatePosition/UpdatePosition";
import { useAuth } from "../../../context/AuthContext";

const Position = () => {
  const { user } = useAuth();

  const roleAccess = {
    view: ["ADMIN"],
    create: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

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

  const fetchListPosition = async (
    SearchTerm = "null",
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllPosition(SearchTerm, pageIndex, pageSize);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListPosition(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListPosition("", 1, 10);
  }, [pageIndex, pageSize, hasPermision("view")]);

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

  if (!hasPermision("view")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="position-content container">
      <div className="table-position-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên chức vụ "
          />

          {hasPermision("create") && (
            <Button
              onClick={handleShowCreate}
              className="mb-2 btn btn-label btn-primary"
            >
              <FaPlus className="" /> Thêm chức vụ
            </Button>
          )}
        </div>

        <ListPosition
          listPosition={listPosition}
          handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
          handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
        />

        {hasPermision("create") && (
          <CreatePosition
            fetchListPosition={fetchListPosition}
            showCreate={showCreate}
            setShowCreate={setShowCreate}
          />
        )}

        {hasPermision("update") && (
          <UpdatePosition
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListPosition={fetchListPosition}
          />
        )}

        {hasPermision("delete") && (
          <DeletePosition
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListPosition={fetchListPosition}
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

export default Position;
