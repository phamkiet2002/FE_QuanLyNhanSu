import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaClock, FaStickyNote } from "react-icons/fa";
import "./CreateAttendanceStyle.scss";
import { createAttendance } from "../../../../../services/AttendanceService";

const CreateAttendance = (props) => {
  const { showCreate, setShowCreate, employeeId, date, onSuccess } = props;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [approvalNote, setApprovalNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showCreate) {
      setCheckIn("08:00");
      setCheckOut("17:00");
      setApprovalNote("");
    }
  }, [showCreate]);

  const handleClose = () => {
    setShowCreate(false);
    resetForm();
  };

  const resetForm = () => {
    setCheckIn("");
    setCheckOut("");
    setApprovalNote("");
    setIsSubmitting(false);
  };
  const validateDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate <= today;
  };

  const validateTimes = () => {
    const [inHours, inMinutes] = checkIn.split(":").map(Number);
    const [outHours, outMinutes] = checkOut.split(":").map(Number);

    const checkInTime = inHours * 60 + inMinutes;
    const checkOutTime = outHours * 60 + outMinutes;

    return checkOutTime > checkInTime;
  };

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Vui lòng nhập đầy đủ thời gian check-in và check-out");
      return;
    }
    if (!validateDate()) {
      toast.error("Chỉ có thể thêm chấm công cho ngày hôm nay hoặc trước đó");
      return;
    }
    if (!validateTimes()) {
      toast.error("Thời gian check-out phải sau thời gian check-in");
      return;
    }

    setIsSubmitting(true);

    try {
      const [checkInHours, checkInMinutes] = checkIn.split(":").map(Number);
      const [checkOutHours, checkOutMinutes] = checkOut.split(":").map(Number);

      const timezoneOffset = new Date().getTimezoneOffset();
      const checkInDate = new Date(date);
      checkInDate.setHours(checkInHours, checkInMinutes - timezoneOffset, 0, 0);

      const checkOutDate = new Date(date);
      checkOutDate.setHours(
        checkOutHours,
        checkOutMinutes - timezoneOffset,
        0,
        0
      );

      const attendanceData = {
        employeeId,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        approvalNote,
      };

      const response = await createAttendance(attendanceData);

      if (response.isSuccess) {
        toast.success("Thêm chấm công thành công");
        handleClose();
        if (onSuccess) onSuccess();
      } else {
        toast.error(response.message || "Lỗi khi thêm chấm công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={showCreate}
      onHide={handleClose}
      className="attendance-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Bổ sung chấm công</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Giờ vào</Form.Label>
            <Form.Control
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="time-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giờ ra</Form.Label>
            <Form.Control
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
              className="note-input"
              placeholder="Nhập ghi chú..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="save-btn"
        >
          {isSubmitting ? "Đang lưu..." : "Lưu"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAttendance;
