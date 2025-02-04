import React, { useState, useEffect } from "react";
import { approveLeaveRegistration } from "../../../../../../services/ApprovalService";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Icon } from "@mdi/react";
import { mdiCheckBold, mdiCloseThick } from "@mdi/js";
import "./ListLeaveRegistrationNghiBuoiStyle.scss";

const ListLeaveRegistrationNghiBuoi = (props) => {
  const { listLeaveRegistration, fetchListLeaveRegistration } = props;
  const [leaveRegistrations, setLeaveRegistrations] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    setLeaveRegistrations(listLeaveRegistration);
  }, [listLeaveRegistration]);

  const formatDate = (dateString) => {
    const date = new Date(new Date(dateString).getTime() + 7 * 60 * 60 * 1000);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleApprove = async (item) => {
    try {
      const res = await approveLeaveRegistration(item.id, "", 1);
      if (res.isSuccess) {
        toast.success("Đã duyệt đơn nghỉ phép");
        setLeaveRegistrations((prev) =>
          prev.map((registration) =>
            registration.id === item.id
              ? { ...registration, pendingApproval: "Daduyet" }
              : registration
          )
        );
        fetchListLeaveRegistration();
      } else {
        toast.error(res.detail || "Có lỗi xảy ra khi duyệt đơn");
      }
    } catch (error) {
      toast.error(error.detail || "Có lỗi xảy ra khi duyệt đơn");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }

    try {
      const res = await approveLeaveRegistration(
        selectedItem.id,
        rejectReason,
        2
      );
      if (res.isSuccess) {
        toast.success("Đã từ chối đơn nghỉ phép");
        setLeaveRegistrations((prev) =>
          prev.map((registration) =>
            registration.id === selectedItem.id
              ? { ...registration, pendingApproval: "Tuchoi" }
              : registration
          )
        );
        setShowRejectModal(false);
        setRejectReason("");
        setSelectedItem(null);
        fetchListLeaveRegistration();
      } else {
        toast.error(res.detail || "Có lỗi xảy ra khi từ chối đơn");
      }
    } catch (error) {
      toast.error(error.detail || "Có lỗi xảy ra khi từ chối đơn");
    }
  };

  const openRejectModal = (item) => {
    setSelectedItem(item);
    setShowRejectModal(true);
  };

  return (
    <>
      <div className="LeaveRegistration container">
        <Table className="LeaveRegistration_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Nhân viên yêu cầu</th>
              <th>Thông tin xin nghỉ</th>
              <th>Lý do</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listLeaveRegistration.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.employee.name}</td>
                <td>
                  Nghỉ buổi:
                  {item.halfDayoff == "Sang"
                    ? " Sáng"
                    : item.halfDayoff == "Chieu"
                    ? " Chiều"
                    : "Không xác định"}
                  <br />
                  Ngày: {formatDate(item.dayOff)}
                </td>
                <td>{item.leaveReason}</td>
                <td
                  className={`LeaveRegistration_pendingApproval_${item.pendingApproval}`}
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
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {item.pendingApproval === "Chuaduyet" && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-primary mr-2"
                          onClick={() => handleApprove(item)}
                        >
                          <Icon
                            path={mdiCheckBold}
                            size={1.25}
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              padding: ".25rem .5rem",
                            }}
                            className="mr-1"
                          />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => openRejectModal(item)}
                        >
                          <Icon
                            path={mdiCloseThick}
                            size={1.25}
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              padding: ".25rem .5rem",
                            }}
                            className="mr-1"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {listLeaveRegistration && listLeaveRegistration.length === 0 && (
              <tr>
                <td className="text-center" colSpan={"7"}>
                  Not found Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {/* Modal từ chối */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Từ chối đơn nghỉ phép</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Lý do từ chối <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleReject}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListLeaveRegistrationNghiBuoi;
