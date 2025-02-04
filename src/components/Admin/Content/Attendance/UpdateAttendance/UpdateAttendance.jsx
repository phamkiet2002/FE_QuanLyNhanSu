import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./UpdateAttendanceStyle.scss";
import { updateAttendance } from "../../../../../services/AttendanceService";

const UpdateAttendance = (props) => {
  const { showUpdate, setShowUpdate, dataUpdate, fetchListAttendance } = props;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [reasonNote, setReasonNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      const formatTimeFromDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      setCheckIn(formatTimeFromDate(dataUpdate.checkIn));
      setCheckOut(formatTimeFromDate(dataUpdate.checkOut));
      setReasonNote(dataUpdate.reasonNote || "");
    }
  }, [showUpdate, dataUpdate]);

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const resetForm = () => {
    setCheckIn("");
    setCheckOut("");
    setReasonNote("");
    setIsSubmitting(false);
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

    if (!validateTimes()) {
      toast.error("Thời gian check-out phải sau thời gian check-in");
      return;
    }
    setIsSubmitting(true);
    try {
      const [checkInHours, checkInMinutes] = checkIn.split(":").map(Number);
      const [checkOutHours, checkOutMinutes] = checkOut.split(":").map(Number);
      const timezoneOffset = new Date().getTimezoneOffset();
      const checkInDate = new Date(dataUpdate.checkIn);
      const checkOutDate = new Date(dataUpdate.checkOut);
      checkInDate.setHours(checkInHours, checkInMinutes - timezoneOffset, 0, 0);
      checkOutDate.setHours(
        checkOutHours,
        checkOutMinutes - timezoneOffset,
        0,
        0
      );

      const attendance = {
        id: dataUpdate.id,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        reasonNote: reasonNote || "",
      };

      const response = await updateAttendance(attendance);

      if (response.isSuccess) {
        toast.success("Cập nhật chấm công thành công");
        handleClose();
        if (fetchListAttendance) fetchListAttendance();
      } else {
        toast.error(response.message || "Lỗi khi cập nhật chấm công");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={showUpdate} onHide={handleClose} className="modal-create">
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật chấm công</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Giờ vào<span className="valid">*</span>
            </Form.Label>
            <Form.Control
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="time-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Giờ ra<span className="valid">*</span>
            </Form.Label>
            <Form.Control
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Lý do<span className="valid">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reasonNote}
              onChange={(e) => setReasonNote(e.target.value)}
              className="note-input"
              placeholder="Nhập lý do..."
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

export default UpdateAttendance;
