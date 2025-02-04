import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import "./LeaveRegistrationUserStyle.scss";
import "react-datepicker/dist/react-datepicker.css";
import ListLeaveRegistrationUser from "./ListRegistrationUser/ListLeaveRegistrationUser";
import Pagination from "../../../Common/Pagination/Pagination";
import { getEmployeeLeaveRegistration } from "../../../../services/LeaveRegistration";
import CreateLeaveRegistrationUser from "./CreateLeaveRegistrationUser/CreateLeaveRegistrationUser";
import { useNavigate } from "react-router-dom";
import MonthDatepicker from "../../../Common/MonthDatepicker/MonthDatepicker";

const LeaveRegistrationUser = () => {
  const [listLeaveRegistration, setListLeaveRegistration] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [employee, setEmployee] = useState({ maNV: "", name: "" });
  const [showCreate, setShowCreate] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const navigate = useNavigate();

  const fetchListLeaveRegistration = async (month, pageIndex, pageSize) => {
    try {
      const res = await getEmployeeLeaveRegistration(
        month,
        pageIndex,
        pageSize
      );

      if (res.isSuccess) {
        const { value } = res;
        setListLeaveRegistration(value.leaveRegistrations.items || []);
        setEmployee({
          maNV: value.maNV,
          name: value.name,
        });
        setPageIndex(value.leaveRegistrations.pageIndex);
        setPageSize(value.leaveRegistrations.pageSize);
        setTotalCount(value.leaveRegistrations.totalCount || 0); // Default to 0 if undefined
      } else {
        console.error("Error fetching leave registrations:", res.detail);
        setListLeaveRegistration([]);
        setTotalCount(0);
      }
    } catch (error) {
      setListLeaveRegistration([]);
      setTotalCount(0);
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const monthString = formatDate(selectedMonth);
    fetchListLeaveRegistration(monthString, pageIndex, pageSize);
  }, [selectedMonth, pageIndex, pageSize]);

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    setPageIndex(1);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  return (
    <>
      <Container className="leaveregistrationuser-container">
        <Row className="header-leaveregistrationuser-container mb-4">
          <Col md={4}>
            <Row className="mb-4">
              <Col className="d-flex align-items-center">
                <FaArrowLeft
                  className="cursor-pointer me-2"
                  style={{ fontSize: "20px" }}
                  onClick={handleBack}
                />

                <h3 className="mb-0">Danh sách đăng ký nghỉ</h3>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <MonthDatepicker
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </Col>
          <Col md={4} className="d-flex justify-content-end">
            <Button
              className="mb-2 btn btn-label btn-primary"
              onClick={handleShowCreate}
            >
              <FaPlus className="" /> Tạo phiếu đăng ký nghỉ
            </Button>
          </Col>
        </Row>

        <Row className="header-leaveregistrationuser-container">
          <ListLeaveRegistrationUser
            listLeaveRegistration={listLeaveRegistration}
            employee={employee}
            fetchListLeaveRegistration={fetchListLeaveRegistration}
          />
          <Pagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </Row>
      </Container>

      <CreateLeaveRegistrationUser
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        fetchListLeaveRegistration={fetchListLeaveRegistration}
      />
    </>
  );
};

export default LeaveRegistrationUser;
