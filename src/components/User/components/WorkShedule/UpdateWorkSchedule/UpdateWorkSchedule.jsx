import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UpdateWorkScheduleStyle.scss";
import { updateWorkSchedule } from "../../../../../services/WorkScheduleService";
import { toast } from "react-toastify";

const UpdateWorkSchedule = (props) => {
  const { showUpdate, setShowUpdate, fetchListWorkSchedule, dataUpdate } = props;

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");

  const reSetForm = () => {
    setName("");
    setStartTime("");
    setEndTime("");
    setBreakStartTime("");
    setBreakEndTime("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    reSetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      name === "" ||
      startTime === "" ||
      endTime === "" ||
      breakStartTime === "" ||
      breakEndTime === ""
    ) {
      valid = false;
    }
    return valid;
  };

  useEffect(() => {
    if (showUpdate) {
      setName(dataUpdate.name);
      setStartTime(dataUpdate.startTime);
      setEndTime(dataUpdate.endTime);
      setBreakStartTime(dataUpdate.breakStartTime);
      setBreakEndTime(dataUpdate.breakEndTime);
    }
  }, [dataUpdate, showUpdate]);

  const handleUpdateWorkSchedule = async () => {
    if (validateForm()) {
      const updatedWorkSchedule = {
        name, startTime, endTime, breakStartTime, breakEndTime,
      };
      let res = await updateWorkSchedule(dataUpdate.id, updatedWorkSchedule);
      if (res.isSuccess === true) {
        handleClose();
        fetchListWorkSchedule("", 1, 10);
        toast.success("Cập nhật thành công.");
      } else {
        toast.error("Lỗi khi cập nhật.");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ các trường có dấu sao đỏ.");
    }
  };

  return (
    <Modal
      show={showUpdate}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thời gian làm việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">
              Tên thời gian làm việc
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhâp tên thời gian làm việc"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Giờ bắt đầu
              <span className="valid">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(event) => {
                const timeWithSeconds = `${event.target.value}:00`;
                setStartTime(timeWithSeconds);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Giờ kết thúc
              <span className="valid">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(event) => {
                const timeWithSeconds = `${event.target.value}:00`;
                setEndTime(timeWithSeconds);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Giờ bắt đầu nghỉ
              <span className="valid">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              value={breakStartTime}
              onChange={(event) => {
                const timeWithSeconds = `${event.target.value}:00`;
                setBreakStartTime(timeWithSeconds);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Giờ kết thúc nghỉ
              <span className="valid">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              value={breakEndTime}
              onChange={(event) => {
                const timeWithSeconds = `${event.target.value}:00`;
                setBreakEndTime(timeWithSeconds);
              }}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleUpdateWorkSchedule}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateWorkSchedule;
