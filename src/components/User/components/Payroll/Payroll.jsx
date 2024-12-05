import React from "react";
import { useState, useMemo } from "react";
import { Table, Container, Col, Row } from "react-bootstrap";
import "./PayrollStyle.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft } from "react-icons/fa";

const Payroll = ({ onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const dateRange = useMemo(() => {
    const firstDay = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    );

    return {
      start: firstDay.toLocaleDateString("vi-VN"),
      end: lastDay.toLocaleDateString("vi-VN"),
    };
  }, [selectedMonth]);

  // test data
  const payrollData = [
    {
      maNv: "NV001",
      name: "Nguyen Van A",
      basicSalary: "15,000,000",
      totalAllowance: "2,000,000",
      totalPenalty: "500,000",
      totalSalary: "16,500,000",
      netPay: "16,500,000",
      roundedPay: "16,500,000",
      status: "Đã gửi phiếu lương",
      payPeriod: "09/2023",
    },
    {
      maNv: "NV001",
      name: "Nguyen Van A",
      basicSalary: "15,000,000",
      totalAllowance: "2,000,000",
      totalPenalty: "0",
      totalSalary: "17,000,000",
      netPay: "17,000,000",
      roundedPay: "17,000,000",
      status: "Đã gửi phiếu lương",
      payPeriod: "10/2023",
    },
  ];

  const filteredPayrollData = payrollData.filter((item) => {
    const itemDate = new Date(item.payPeriod);
    return (
      itemDate.getMonth() === selectedMonth.getMonth() &&
      itemDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  return (
    <Container className="payroll-container mt-4">
      <Row className="mb-4">
        <Col md={4}>
          <Row className="mb-4">
            <Col className="d-flex align-items-center">
              <FaArrowLeft
                className="cursor-pointer me-2"
                style={{ fontSize: "20px" }}
                onClick={onBack}
              />
              <h3 className="mb-0">Bảng lương nhân viên</h3>
            </Col>
          </Row>
        </Col>
        <Col md={8} className="d-flex justify-content-end align-items-center">
          <div className="me-2  ">Chọn tháng:</div>
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="form-control col-3"
            placeholderText="Chọn tháng/năm"
          />
        </Col>
      </Row>
      <div className="date-range-display col-3 mb-3">
        {dateRange.start} - {dateRange.end}
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Lương cơ bản</th>
            <th>Tổng phụ cấp</th>
            <th>Tổng phạt</th>
            <th>Tổng lương</th>
            <th>Thực nhận</th>
            <th>Làm tròn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((item, index) => (
            <tr key={index}>
              <td>{item.maNv}</td>
              <td>{item.name}</td>
              <td>{item.basicSalary}</td>
              <td>{item.totalAllowance}</td>
              <td>{item.totalPenalty}</td>
              <td>{item.totalSalary}</td>
              <td>{item.netPay}</td>
              <td>{item.roundedPay}</td>
              <td style={{ color: "red" }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Payroll;
