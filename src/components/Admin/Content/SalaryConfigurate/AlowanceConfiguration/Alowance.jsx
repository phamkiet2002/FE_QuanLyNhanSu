import React, { useEffect, useState } from "react";
import ListAlowance from "./ListAlowance/ListAlowance";
import { getAllAlowance } from "../../../../../services/AlowanceService";
import "./AllowanceStyle.scss";
import Pagination from "../../../../Common/Pagination/Pagination";
import { getAllWorkPlace } from "../../../../../services/WorkplaceService";
import Fillter from "./Fillter/Fillter";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import CreateAllowance from "./CreateAllowance/CreateAllowance";
import { getAllTypeOfAllowance } from "../../../../../services/EnumService";
import UpdateAllowance from "./UpdateAllowance/UpdateAllowance";
import DeleteAlowance from "./DeleteAlowance/DeleteAlowance";
import { useAuth } from "../../../../context/AuthContext";

const Alowance = () => {
  const { user } = useAuth();

  const roleAccess = {
    create: ["ADMIN", "HR_MANAGER"],
    update: ["ADMIN", "HR_MANAGER"],
    delete: ["ADMIN", "HR_MANAGER"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [listAlowance, setListAlowance] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, settotalCount] = useState(0);

  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");

  const [typeOfAllowance, setTypeOfAllowance] = useState([]);
  const [selectedTypeOfAllowance, setSelectedTypeOfAllowance] = useState("");

  const [showCreate, setShowCreate] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showDelete, setShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const loaiPhuCap = {
    0: "Phụ cấp điện thoại",
    1: "Phụ cấp đi lại",
    2: "Phụ cấp tiền ăn trưa",
    3: "Phụ cấp xăng xe",
  };

  const fetchListAlowance = async (
    selectedTypeOfAllowance = null,
    selectedWorkPlace,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllAlowance(
        selectedTypeOfAllowance,
        selectedWorkPlace,
        pageIndex,
        pageSize
      );
      settotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListAlowance(res.value.items);
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

  const fetchEnumTypeOfAllowance = async () => {
    try {
      let res = await getAllTypeOfAllowance();
      setTypeOfAllowance(res.value);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListAlowance(
      selectedTypeOfAllowance,
      selectedWorkPlace,
      pageIndex,
      pageSize
    );
    fetchWorkPlace();
    fetchEnumTypeOfAllowance();
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListAlowance(
      selectedTypeOfAllowance,
      selectedWorkPlace,
      pageIndex,
      pageSize
    );
  };

  const handleClear = () => {
    setSelectedTypeOfAllowance("");
    setSelectedWorkPlace("");
    setPageIndex(1);
    fetchListAlowance("", "", 1, pageSize);
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

  const handleShowUpdate = (allowance) => {
    setShowUpdate(true);
    setDataUpdate(allowance);
  };

  const handleShowDelete = (allowance) => {
    setShowDelete(true);
    setDataDelete(allowance);
  };

  return (
    <div className="allowance-content container">
      <div className="table-allowance-container">
        <div className="wrap_fillter">
          <Fillter
            loaiPhuCap={loaiPhuCap}
            typeOfAllowance={typeOfAllowance}
            selectedTypeOfAllowance={selectedTypeOfAllowance}
            setSelectedTypeOfAllowance={setSelectedTypeOfAllowance}
            workPlaces={workPlaces}
            selectedWorkPlace={selectedWorkPlace}
            setSelectedWorkPlace={setSelectedWorkPlace}
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

        <ListAlowance
          listAlowance={listAlowance}
          handleShowUpdate={hasPermision("update") ? handleShowUpdate : null}
          handleShowDelete={hasPermision("delete") ? handleShowDelete : null}
        />

        {hasPermision("create") && (
          <CreateAllowance
            loaiPhuCap={loaiPhuCap}
            typeOfAllowance1={typeOfAllowance}
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            workPlaces={workPlaces}
            fetchListAlowance={fetchListAlowance}
          />
        )}

        {hasPermision("update") && (
          <UpdateAllowance
            showUpdate={showUpdate}
            loaiPhuCap={loaiPhuCap}
            workPlaces={workPlaces}
            typeOfAllowance1={typeOfAllowance}
            setShowUpdate={setShowUpdate}
            dataUpdate={dataUpdate}
            fetchListAlowance={fetchListAlowance}
          />
        )}

        {hasPermision("delete") && (
          <DeleteAlowance
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            dataDelete={dataDelete}
            fetchListAlowance={fetchListAlowance}
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

export default Alowance;
