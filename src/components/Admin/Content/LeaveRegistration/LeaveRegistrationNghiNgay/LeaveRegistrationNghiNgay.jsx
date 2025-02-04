import React, { useEffect, useState } from "react";
import { getAllLeaveRegistrationDayOff } from "../../../../../services/LeaveRegistration";
import ListLeaveRegistrationNghiNgay from "./ListLeaveRegistrationNghiNgay/ListLeaveRegistrationNghiNgay";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Pagination from "../../../../Common/Pagination/Pagination";
import SearchFillter from "../../../../Common/Fillter/SearchFillter";
import Fillter from "./Fillter/Fillter";

const LeaveRegistrationNghiNgay = () => {
  const [listLeaveRegistration, setListLeaveRegistration] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pendingApproval, setPendingApproval] = useState(0);

  const fetchListLeaveRegistration = async (
    searchTerm = "",
    pendingApproval,
    pageIndex,
    pageSize
  ) => {
    try {
      let res = await getAllLeaveRegistrationDayOff(
        searchTerm,
        pendingApproval,
        pageIndex,
        pageSize
      );
      setTotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
      setListLeaveRegistration(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchListLeaveRegistration(
      filterText,
      pendingApproval,
      pageIndex,
      pageSize
    );
  }, [pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchListLeaveRegistration(filterText, pendingApproval, 1, pageSize);
  };

  const handleClear = () => {
    setFilterText("");
    setPendingApproval(0);
    setPageIndex(1);
    fetchListLeaveRegistration("", 0, 1, pageSize);
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
    <div className="leaveRegistration-content container">
      <div className="table-leaveRegistration-container">
        <div className="wrap_fillter">
          <SearchFillter
            filterText={filterText}
            setFilterText={setFilterText}
            handleFilter={handleFilter}
            handleClear={handleClear}
            placeholder="Nhập tên nhân viên"
          >
            <Fillter
              pendingApproval={pendingApproval}
              setPendingApproval={setPendingApproval}
            />
          </SearchFillter>
        </div>

        <ListLeaveRegistrationNghiNgay
          listLeaveRegistration={listLeaveRegistration}
          fetchListLeaveRegistration={fetchListLeaveRegistration}
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

export default LeaveRegistrationNghiNgay;
