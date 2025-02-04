import React, { useEffect, useState } from "react";
import ListAttendanceSetting from "./ListAttendanceSetting/ListAttendanceSetting";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "./AttendanceSettingStyle.scss";
import { getAllAttendanceSetting } from "../../../../../services/AttendanceSetting";
import Pagination from "../../../../Common/Pagination/Pagination";
import Fillter from "./Fillter/Fillter";
import CreateAttendanceSetting from "./CreateAttendanceSetting/CreateAttendanceSetting";
import UpdateAttendanceSetting from "./UpdateAttendanceSetting/UpdateAttendanceSetting";
import DeleteAttendanceSetting from "./DeleteAttendanceSetting/DeleteAttendanceSetting";
import { useAuth } from "../../../../context/AuthContext";

const AttendanceSetting = () => {
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

  const fetchListAttendanceSetting = async (
    status = null,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllAttendanceSetting(status, pageIndex, pageSize);
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListAttendanceSetting(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListAttendanceSetting(status, pageIndex, pageSize);
  }, [pageIndex, pageSize, hasPermision("view")]);

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

  if (!hasPermision("view")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="position-content container">
      <div className="table-position-container">
        <div className="wrap_fillter">
          <Fillter
            status={status}
            setStatus={setStatus}
            handleFilter={handleFilter}
            handleClear={handleClear}
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

        <ListAttendanceSetting
          listAttendanceSetting={listAttendanceSetting}
          handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
          handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
        />

        {hasPermision("create") && (
          <CreateAttendanceSetting
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            fetchListAttendanceSetting={fetchListAttendanceSetting}
          />
        )}

        {hasPermision("update") && (
          <UpdateAttendanceSetting
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListAttendanceSetting={fetchListAttendanceSetting}
          />
        )}

        {hasPermision("delete") && (
          <DeleteAttendanceSetting
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListAttendanceSetting={fetchListAttendanceSetting}
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

export default AttendanceSetting;
