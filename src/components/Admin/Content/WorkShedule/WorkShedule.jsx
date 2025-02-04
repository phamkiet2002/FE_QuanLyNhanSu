import React, { useEffect, useState } from "react";
import { getAllWorkShedule } from "../../../../services/WorkScheduleService";
import ListWorkShedule from "./ListWorkShedule/ListWorkShedule";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import "./WorkSheduleStyle.scss";
import DeleteWorkSchedule from "./DeleteWorkSchedule/DeleteWorkSchedule";
import SearchFillter from "../../../Common/Fillter/SearchFillter";
import Pagination from "../../../Common/Pagination/Pagination";
import CreateWorkSchedule from "./CreateWorkSchedule/CreateWorkSchedule";
import UpdateWorkSchedule from "./UpdateWorkSchedule/UpdateWorkSchedule";
import { useAuth } from "../../../context/AuthContext";

const WorkShedule = () => {
  const { user } = useAuth();

  const roleAccess = {
    create: ["ADMIN"],
    update: ["ADMIN"],
    view: ["ADMIN"],
    delete: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

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
      <div className="table-workshedule-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên thời gian"
          />

          {hasPermision("create") && (
            <Button
              onClick={handleShowCreate}
              className="mb-2 btn btn-label btn-primary"
            >
              <FaPlus className="" /> Thêm thời gian làm việc
            </Button>
          )}
        </div>

        {hasPermision("view") && (
          <ListWorkShedule
            listWorkShedule={listWorkShedule}
            handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
            handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
          />
        )}

        {hasPermision("create") && (
          <CreateWorkSchedule
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            fetchListWorkSchedule={fetchListWorkSchedule}
          />
        )}

        {hasPermision("update") && (
          <UpdateWorkSchedule
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            fetchListWorkSchedule={fetchListWorkSchedule}
            dataUpdate={dataUpdate}
          />
        )}

        {hasPermision("delete") && (
          <DeleteWorkSchedule
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListWorkSchedule={fetchListWorkSchedule}
          />
        )}

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