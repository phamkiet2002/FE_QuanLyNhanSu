import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Col,
  Row,
  Form,
  InputGroup,
} from "react-bootstrap";
import { getEmployeeLogin } from "../../../../services/EmployeeService";
import Pagination from "../../../Common/Pagination/Pagination";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./PayrollStyle.scss";
import MonthDatepicker from "../../../Common/MonthDatepicker/MonthDatepicker";

const Payroll = () => {
  const navigate = useNavigate();
  const [payrollData, setPayrollData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPayrollData = async () => {
    try {
      const response = await getEmployeeLogin();

      if (response.isSuccess) {
        const employee = response.value;
        const filteredPayrolls = employee.payRolls.filter((payroll) => {
          const payrollDate = new Date(payroll.fromDate);
          return (
            payrollDate.getMonth() === selectedMonth.getMonth() &&
            payrollDate.getFullYear() === selectedMonth.getFullYear()
          );
        });

        setPayrollData([{ ...employee, payRolls: filteredPayrolls }]);
        setTotalCount(filteredPayrolls.length);
      } else {
        console.error(response.error.message);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bảng lương:", error);
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, [selectedMonth, pageIndex, pageSize]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchPayrollData();
  };

  const handleClear = () => {
    setSelectedWorkPlace("");
    setSelectedMonth(new Date());
    fetchPayrollData();
  };
  const handleBack = () => {
    navigate("/user-dashboard");
  };
  return (
    <Container className="payroll-container mt-4">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={handleBack}
        />
        <h3 className="mb-0">Bảng lương nhân viên</h3>
      </div>
      <div className="wrap_fillter">
        <div className="wrap_fillter">
          <Row className="mb-3 row-tool align-items-center">
            <Col xs={12} md="auto">
              <MonthDatepicker
                selected={selectedMonth}
                onChange={(date) => {
                  setSelectedMonth(date);
                  setPageIndex(1);
                }}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="form-control"
                placeholderText="Chọn tháng"
              />
            </Col>
          </Row>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Nơi làm việc</th>
            <th>Lương cơ bản</th>
            <th>Số ngày làm việc thực tế</th>
            <th>Tổng phụ cấp</th>
            <th>Tổng phạt</th>
            <th>Tổng lương</th>
            <th>Thực nhận</th>
            <th>Trạng thái trả lương</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.length === 0 || payrollData[0]?.payRolls.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center py-3">
                Không tìm thấy dữ liệu
              </td>
            </tr>
          ) : (
            payrollData.map((employee) =>
              employee.payRolls.map((payroll, index) => (
                <tr key={`${employee.id}-${index}`}>
                  <td>{employee.maNV}</td>
                  <td>{employee.name}</td>
                  <td>{employee.workPlace?.name}</td>
                  <td>
                    {employee.salarys?.[0]?.salarys?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{payroll.actualWorkingDay}</td>
                  <td>
                    {payroll.totalAllowance?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {payroll.totalPenalties?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {payroll.salaryGross?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {payroll.salaryNet?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td
                    className={
                      payroll.payRollStatus === "PAID"
                        ? "status-paid"
                        : "status-unpaid"
                    }
                  >
                    {payroll.payRollStatus === "PAID"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </Table>
      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        handlePreviousPage={() => setPageIndex((prev) => prev - 1)}
        handleNextPage={() => setPageIndex((prev) => prev + 1)}
      />
    </Container>
  );
};

export default Payroll;
