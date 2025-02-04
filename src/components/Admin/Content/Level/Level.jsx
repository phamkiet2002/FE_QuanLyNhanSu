import React, { useEffect, useState } from "react";
import ListLevel from "./ListLevel/ListLevel";
import { getAllLevel } from "../../../../services/LevelService";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./LevelStyle.scss";
import Pagination from "../../../Common/Pagination/Pagination";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import CreateLeve from "./CreateLevel/CreateLeve";
import UpdateLevel from "./UpdateLevel/UpdateLevel";
import DeleteLevel from "./DeleteLevel/DeleteLevel";
import { useAuth } from "../../../context/AuthContext";

const Level = () => {
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

  const fetchListLevel = async (SearchTerm, pageIndex, pageSize) => {
    try {
      let res = await getAllLevel(SearchTerm, pageIndex, pageSize);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListLevel(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListLevel("", 1, 10);
  }, [pageIndex, pageSize, hasPermision("view")]);

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

  if (!hasPermision("view")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="level-content container">
      <div className="table-level-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên level"
          />

          {hasPermision("create") && (
            <Button
              onClick={handleShowCreate}
              className="mb-2 btn btn-label btn-primary"
            >
              <FaPlus className="" /> Thêm mới
            </Button>
          )}
        </div>

        <ListLevel
          listLevel={listLevel}
          handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
          handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
        />

        {hasPermision("create") && (
          <CreateLeve
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            fetchListLevel={fetchListLevel}
          />
        )}

        {hasPermision("update") && (
          <UpdateLevel
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListLevel={fetchListLevel}
          />
        )}

        {hasPermision("delete") && (
          <DeleteLevel
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListLevel={fetchListLevel}
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

export default Level;
