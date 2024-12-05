import React from "react";
import { Container, Button, Form, Tabs, Tab, Row, Col } from "react-bootstrap";
const WorkInformation = (props) => {
  const { employeeDetails } = props;

  return (
    <>
      <Row>
        <Col md={3} className="mb-3 text-secondary">
          Mã nhân viên:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.maNv}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Phòng ban:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.department}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Chức vụ:
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.position}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Lương:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.salary?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Trình độ:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.level}
        </Col>
      </Row>
    </>
  );
};

export default WorkInformation;
