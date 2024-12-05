import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Button } from "react-bootstrap";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import "./LeaveRegistrationUserStyle.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LisLeaveRegistrationUser from "./ListRegistrationUser/ListLeaveRegistrationUser";
import Pagination from "../../../Common/Pagination/Pagination";
import {
  getAllLeaveRegistrationDayOff,
  getAllLeaveRegistrationHalfDayOff,
} from "../../../../services/LeaveRegistration";
import CreateLeaveRegistrationUser from "./CreateLeaveRegistrationUser/CreateLeaveRegistrationUser";

const LeaveRegistrationUser = ({ onBack }) => {
  const [listLeaveRegistration, setListLeaveRegistration] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [showCreate, setShowCreate] = useState(false);

  const fetchListLeaveRegistration = async (pageIndex, pageSize) => {
    try {
      const dayOffRes = await getAllLeaveRegistrationDayOff(
        "",
        null,
        pageIndex,
        pageSize
      );
      const dayOffData = dayOffRes.value.items;

      const halfDayOffRes = await getAllLeaveRegistrationHalfDayOff(
        "",
        null,
        pageIndex,
        pageSize
      );
      const halfDayOffData = halfDayOffRes.value.items;

      const combinedData = [...dayOffData, ...halfDayOffData];
      setListLeaveRegistration(combinedData);

      setTotalCount(
        dayOffRes.value.totalCount + halfDayOffRes.value.totalCount
      );
      setPageSize(pageSize);
    } catch (error) {
      console.error("Error fetching leave registrations:", error);
    }
  };

  useEffect(() => {
    fetchListLeaveRegistration(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

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
                  onClick={onBack}
                />
                <h3 className="mb-0">Danh sách đăng ký nghỉ</h3>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="d-flex justify-content-end">
            <Button
              className="mb-2 btn btn-label btn-primary"
              onClick={handleShowCreate}
            >
              <FaPlus className="" /> Tạo phiếu đăng ký nghỉ
            </Button>
          </Col>
        </Row>

        <Row className="header-leaveregistrationuser-container">
          <LisLeaveRegistrationUser
            listLeaveRegistration={listLeaveRegistration}
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
