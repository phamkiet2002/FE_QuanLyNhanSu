import React, { useState, useEffect } from "react";
import { getAllAttendance } from "../../../../../services/AttendanceService";
import ListAttendanceApproval from "./ListAttendanceApproval/ListAttendanceApproval";
import { Button } from "react-bootstrap";
import "./AttendanceApprovalStyle.scss";
import Pagination from "../../../../Common/Pagination/Pagination";
import SearchFillter from "../../../../Common/Fillter/SearchFillter";
import Fillter from "./Fillter/Fillter";

const AttendanceApproval = () => {
  const [listAttendance, setListAttendance] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pendingApproval, setPendingApproval] = useState(0);

  const fetchListAttendance = async (searchTerm = "", pageIndex, pageSize) => {
    try {
      let res = await getAllAttendance(searchTerm, pageIndex, pageSize);
      setTotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListAttendance(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListAttendance();
  }, []);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListAttendance(filterText, pendingApproval, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPendingApproval(0);
    setPageIndex(1);
    fetchListAttendance("", 0, 1, pageSize);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex * pageSize < totalCount) {
      setPageIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="attendance-approval-content container">
      <div className="table-attendance-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            // handleFilter={handleFilter}
            // handleClear={handleClear}
            placeholder="Nhập tên nhân viên"
          >
            {/* <Fillter
              pendingApproval={pendingApproval}
              setPendingApproval={setPendingApproval}
            /> */}
          </SearchFillter>
        </div>

        <ListAttendanceApproval
          listAttendance={listAttendance}
          fetchListAttendance={fetchListAttendance}
        />

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

export default AttendanceApproval;
