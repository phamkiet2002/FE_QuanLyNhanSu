import React from "react";
import { Container, Button, Form, Tabs, Tab, Row, Col } from "react-bootstrap";
const PersionalInfomation = (props) => {
  const { employeeDetails } = props;
  return (
    <>
      <Row className="table-persional-info-employee">
        <Col md={3} className="mb-3 text-secondary">
          Họ và tên:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3 ">
          {employeeDetails.name}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          CMND:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.identityCard}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Email:{" "}
        </Col>
        <Col md={9} mb={3}>
          {employeeDetails.email}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Số điện thoại:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.phone}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Ngày sinh:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3 ">
          {employeeDetails.dateOfBirth}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Giới tính:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.gender}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Địa chỉ:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.address}
        </Col>
        <Col md={3} className="mb-3 text-secondary">
          Tài khoản ngân hàng:{" "}
        </Col>
        <Col md={9} mb={3} className="mb-3">
          {employeeDetails.bankName} - {employeeDetails.bankAccountNumber}
        </Col>
      </Row>
    </>
  );
};

export default PersionalInfomation;
