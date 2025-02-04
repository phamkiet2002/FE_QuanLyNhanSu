import React, { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { cancelLeaveRegistration } from "../../../../../services/LeaveRegistration";
import "./ListLeaveRegistrationUserStyle.scss";

const ListLeaveRegistrationUser = (props) => {
  const { listLeaveRegistration, employee, fetchListLeaveRegistration } = props;
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [approvalDetails, setApprovalDetails] = useState(null);
  const [selectedLeaveRegistrationId, setSelectedLeaveRegistrationId] =
    useState(null);

  const formatDate = (dateString) => {
    const date = new Date(new Date(dateString).getTime() + 7 * 60 * 60 * 1000);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleStatusClick = (item) => {
    if (item.pendingApproval === "Chuaduyet") {
      setSelectedLeaveRegistrationId(item.id);
      setShowCancelModal(true);
    } else {
      setApprovalDetails(item.approval);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setApprovalDetails(null);
  };

  const handleCancelLeaveRegistration = async () => {
    try {
      const res = await cancelLeaveRegistration(selectedLeaveRegistrationId);
      if (res && res.isSuccess) {
        toast.success("Hủy phiếu đăng ký nghỉ thành công!");
        setShowCancelModal(false);

        await fetchListLeaveRegistration();
      } else {
        toast.error(res.detail || "Lỗi khi hủy phiếu đăng ký nghỉ");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "Đã xảy ra lỗi khi hủy phiếu đăng ký nghỉ";
      toast.error(errorMessage);
    }
  };

  return (
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
          {listLeaveRegistration.length > 0 ? (
            listLeaveRegistration.map((item, index) => (
              <tr key={index} className="text-center">
                <td>
                  {item.typeOfLeave === "Nghingay" ? "Nghỉ ngày" : "Nghỉ buổi"}
                </td>
                <td>{employee.maNV}</td>
                <td>{employee.name}</td>
                <td>{item.leaveDate?.name}</td>
                <td>
                  {item.typeOfLeave === "Nghingay"
                    ? `${formatDate(item.startDate)} đến ${formatDate(
                        item.endDate
                      )}`
                    : `${
                        item.halfDayOff === 0 ? "Buổi sáng" : "Buổi chiều"
                      } ngày ${formatDate(item.dayOff)}`}
                </td>
                <td>{item.leaveReason}</td>
                <td
                  className={`status-${item.pendingApproval?.toLowerCase()}`}
                  onClick={() => handleStatusClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.pendingApproval === "Daduyet"
                    ? "Đã duyệt"
                    : item.pendingApproval === "Chuaduyet"
                    ? "Chờ duyệt"
                    : item.pendingApproval === "Tuchoi"
                    ? "Từ chối"
                    : item.pendingApproval === "Dahuy"
                    ? "Đã hủy"
                    : "Không xác định"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                Không tìm thấy dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Approval Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người phê duyệt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {approvalDetails ? (
            <div>
              <p>
                <strong>Mã nhân viên:</strong> {approvalDetails.maNV}
              </p>
              <p>
                <strong>Tên:</strong> {approvalDetails.name}
              </p>
            </div>
          ) : (
            <p>Không có thông tin</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Leave Registration Modal */}
      <Modal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        centered
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hủy phiếu đăng ký nghỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn hủy phiếu đăng ký nghỉ này?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Bỏ qua
          </Button>
          <Button variant="danger" onClick={handleCancelLeaveRegistration}>
            Hủy đăng ký
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListLeaveRegistrationUser;
