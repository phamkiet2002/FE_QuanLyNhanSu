import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateOvertimeOutsideWorkHours = (props) => {
  const {
    showModal,
    setShowModal,
    selectedAttendance,
    updateOvertimeOutsideWorkHours,
    fetchAttendanceData,
  } = props;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showModal && selectedAttendance) {
      const formatTimeFromDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      setStartTime(formatTimeFromDate(selectedAttendance.startTime));
      setEndTime(formatTimeFromDate(selectedAttendance.endTime));
    }
  }, [showModal, selectedAttendance]);

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setStartTime("");
    setEndTime("");
    setIsSubmitting(false);
  };

  const validateTimes = () => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startTimeMinutes = startHours * 60 + startMinutes;
    const endTimeMinutes = endHours * 60 + endMinutes;

    return endTimeMinutes > startTimeMinutes;
  };

  const handleSubmit = async () => {
    if (!startTime || !endTime) {
      toast.error("Vui lòng nhập đầy đủ thời gian bắt đầu và kết thúc");
      return;
    }

    if (!validateTimes()) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu");
      return;
    }

    setIsSubmitting(true);

    try {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const timezoneOffset = new Date().getTimezoneOffset();
      const startTimeDate = new Date();
      const endTimeDate = new Date();

      startTimeDate.setHours(startHours, startMinutes - timezoneOffset, 0, 0);
      endTimeDate.setHours(endHours, endMinutes - timezoneOffset, 0, 0);

      const overtimeData = {
        id: selectedAttendance.id,
        startTime: startTimeDate.toISOString(),
        endTime: endTimeDate.toISOString(),
      };

      const response = await updateOvertimeOutsideWorkHours(overtimeData);

      if (response.isSuccess) {
        toast.success("Cập nhật thời gian ra ngoài thành công");
        handleClose();
        fetchAttendanceData();
      } else {
        toast.error(response.message || "Lỗi khi cập nhật thời gian ra ngoài");
      }
    } catch (error) {
      console.error("Update overtime error:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thời gian ra ngoài");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className="modal-overtime"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thời gian ra ngoài</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Thời gian bắt đầu <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Thời gian kết thúc <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
        >
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOvertimeOutsideWorkHours;
