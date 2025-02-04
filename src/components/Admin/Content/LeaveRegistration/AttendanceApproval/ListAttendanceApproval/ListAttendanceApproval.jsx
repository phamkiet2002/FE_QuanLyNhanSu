import React, { useState, useEffect } from "react";
import { approveAttendance } from "../../../../../../services/ApprovalService";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Icon } from "@mdi/react";
import { mdiCheckBold, mdiCloseThick } from "@mdi/js";
import "./ListAttendanceApprovalStyle.scss";

const ListAttendanceApproval = (props) => {
  const { listAttendance, fetchListAttendance } = props;
  const [attendances, setAttendances] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isLate, setIsLate] = useState(false);
  const [isEarlyLeave, setIsEarlyLeave] = useState(false);

  useEffect(() => {
    setAttendances(listAttendance);
  }, [listAttendance]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleApprove = async () => {
    try {
      const res = await approveAttendance(
        selectedItem.id,
        "",
        1,
        isLate,
        isEarlyLeave
      );
      if (res.isSuccess) {
        toast.success("Đã duyệt chấm công");
        setAttendances((prev) =>
          prev.map((attendance) =>
            attendance.id === selectedItem.id
              ? { ...attendance, approval: "Approved" }
              : attendance
          )
        );
        setShowApproveModal(false);
        setSelectedItem(null);
        fetchListAttendance();
      } else {
        toast.error(res.detail || "Có lỗi xảy ra khi duyệt chấm công");
      }
    } catch (error) {
      toast.error(error.detail || "Có lỗi xảy ra khi duyệt chấm công");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }

    try {
      const res = await approveAttendance(
        selectedItem.id,
        rejectReason,
        2,
        isLate,
        isEarlyLeave
      );
      if (res.isSuccess) {
        toast.success("Đã từ chối chấm công");
        setAttendances((prev) =>
          prev.filter((attendance) => attendance.id !== selectedItem.id)
        );
        setShowRejectModal(false);
        setRejectReason("");
        setSelectedItem(null);
        fetchListAttendance();
      } else {
        toast.error(res.detail || "Có lỗi xảy ra khi từ chối chấm công");
      }
    } catch (error) {
      toast.error(error.detail || "Có lỗi xảy ra khi từ chối chấm công");
    }
  };

  const openApproveModal = (item) => {
    setSelectedItem(item);
    setIsLate(item.isLate);
    setIsEarlyLeave(item.isEarlyLeave);
    setShowApproveModal(true);
  };

  const openRejectModal = (item) => {
    setSelectedItem(item);
    setShowRejectModal(true);
  };

  return (
    <>
      <div className="attendance-list container">
        <Table className="attendance-table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Mã nhân viên</th>
              <th>Nhân viên</th>
              <th>Nơi làm việc</th>
              <th>Ngày</th>
              <th>Giờ vào</th>
              <th>Giờ ra</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listAttendance.some((employee) =>
              employee.attendances.some(
                (att) =>
                  (att.isLate || att.isEarlyLeave) && att.approval === null
              )
            ) ? (
              listAttendance.map((employee) =>
                employee.attendances
                  .filter(
                    (att) =>
                      (att.isLate || att.isEarlyLeave) && att.approval === null
                  )
                  .map((attendance, index) => (
                    <tr key={attendance.id} className="text-center">
                      <td>{employee.maNV}</td>
                      <td>{employee.name}</td>
                      <td>{employee.workPlace.name}</td>
                      <td>{formatDate(attendance.checkIn)}</td>
                      <td>{formatDateTime(attendance.checkIn)}</td>
                      <td>{formatDateTime(attendance.checkOut)}</td>
                      <td>
                        {attendance.isLate && (
                          <span className="text-danger">Đi trễ</span>
                        )}
                        {""}
                        {attendance.isEarlyLeave && (
                          <span className="text-warning">Về sớm</span>
                        )}
                      </td>
                      <td>
                        {!attendance.approval && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openApproveModal(attendance)}
                            >
                              <Icon path={mdiCheckBold} size={1} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => openRejectModal(attendance)}
                            >
                              <Icon path={mdiCloseThick} size={1} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
              )
            ) : (
              <tr>
                <td className="text-center" colSpan="8">
                  Not found Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Approve Modal */}
      <Modal
        show={showApproveModal}
        onHide={() => setShowApproveModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Duyệt chấm công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formIsLate">
            <Form.Check
              type="switch"
              label="Đi trễ"
              checked={isLate}
              onChange={(e) => setIsLate(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formIsEarlyLeave">
            <Form.Check
              type="switch"
              label="Về sớm"
              checked={isEarlyLeave}
              onChange={(e) => setIsEarlyLeave(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowApproveModal(false)}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reject Modal */}
      <Modal
        show={showRejectModal}
        onHide={() => setShowRejectModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Từ chối chấm công</Modal.Title>
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
          {/* <Form.Group controlId="formIsLate">
            <Form.Check
              type="switch"
              label="Đi trễ"
              checked={isLate}
              onChange={(e) => setIsLate(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formIsEarlyLeave">
            <Form.Check
              type="switch"
              label="Về sớm"
              checked={isEarlyLeave}
              onChange={(e) => setIsEarlyLeave(e.target.checked)}
            />
          </Form.Group> */}
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

export default ListAttendanceApproval;
