import React from "react";
import { Table } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiBookRemoveOutline } from "@mdi/js";
import { FaMoneyBill } from "react-icons/fa";

const ListPayroll = (props) => {
  const { payrollData, hasPermision, handlePayment } = props;
  return (
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
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {payrollData.length === 0 ||
        payrollData.every((employee) => employee.payRolls.length === 0) ? (
          <tr>
            <td colSpan="11" className="text-center">
              Not Found Data
            </td>
          </tr>
        ) : (
          payrollData.map((employee) =>
            employee.payRolls.map((payroll, i) => (
              <tr key={`${employee.id}-${i}`}>
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
                <td className={`payroll_Status_${payroll.payRollStatus}`}>
                  {payroll.payRollStatus === "PAID"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </td>
                <td>
                  {hasPermision("pay") ? (
                    <button
                      title={
                        payroll.payRollStatus === "PAID"
                          ? "Hủy thanh toán"
                          : "Thanh toán"
                      }
                      className={`btn btn-sm btn-outline-${
                        payroll.payRollStatus === "PAID" ? "danger" : "primary"
                      } m-1`}
                      onClick={() =>
                        handlePayment(
                          payroll.id,
                          payroll.payRollStatus,
                          payroll.salaryNet
                        )
                      }
                    >
                      {payroll.payRollStatus === "PAID" ? (
                        <Icon
                          path={mdiBookRemoveOutline}
                          size={0.7}
                          className="align-middle"
                        />
                      ) : (
                        <FaMoneyBill style={{ verticalAlign: "middle" }} />
                      )}
                    </button>
                  ) : (
                    <span
                      className={
                        payroll.payRollStatus === "PAID"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      <FaMoneyBill
                        style={{ verticalAlign: "center", marginRight: 5 }}
                      />
                      {payroll.payRollStatus === "PAID"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </span>
                  )}
                </td>
              </tr>
            ))
          )
        )}
      </tbody>
    </Table>
  );
};

export default ListPayroll;
