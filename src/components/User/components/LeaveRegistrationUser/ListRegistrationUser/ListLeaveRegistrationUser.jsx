import React from "react";
import { Table, Container } from "react-bootstrap";
import "./ListLeaveRegistrationUserStyle.scss";

const ListLeaveRegistrationUser = ({ listLeaveRegistration }) => {
  const employeeId = localStorage.getItem("employeeId");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  const filteredLeaveRegistrations = listLeaveRegistration.filter(
    (item) => item.employee?.id === employeeId
  );

  return (
    <Container>
      <div className="table-container">
        <Table className="registration-table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Loại nghỉ phép</th>
              <th>Mã nhân viên</th>
              <th>Nhân viên</th>
              <th>Tên ngày nghỉ</th>
              <th>Thời gian nghỉ</th>
              <th>Lý do xin nghỉ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaveRegistrations.length > 0 ? (
              filteredLeaveRegistrations.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>
                    {item.typeOfLeave === "Nghingay"
                      ? "Nghỉ ngày"
                      : "Nghỉ buổi"}
                  </td>
                  <td>{item.employee?.maNv}</td>
                  <td>{item.employee?.name}</td>
                  <td>{item.leaveDate?.name}</td>
                  <td>
                    {item.typeOfLeave === "Nghingay"
                      ? `${formatDate(item.startDate)} đến ${formatDate(
                          item.endDate
                        )}`
                      : `${item.halfDayoff || ""} ngày ${formatDate(
                          item.dayOff || ""
                        )}`}
                  </td>
                  <td>{item.leaveReason}</td>
                  <td
                    className={`status-${item.pendingApproval?.toLowerCase()}`}
                  >
                    {item.pendingApproval === "Daduyet"
                      ? "Đã duyệt"
                      : item.pendingApproval === "Chuaduyet"
                      ? "Chờ duyệt"
                      : item.pendingApproval === "Tuchoi"
                      ? "Từ chối"
                      : "Không xác định"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ListLeaveRegistrationUser;
