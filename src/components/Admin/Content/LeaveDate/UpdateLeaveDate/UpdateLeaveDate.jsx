import React, { useState, useEffect } from "react";
import "./UpdateLeaveDateStyle.scss";
import { updateLeaveDate } from "../../../../../services/LeaveDateService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateLeaveDate = (props) => {
  const { showUpdate, setShowUpdate, fetchListLeaveDate, dataUpdate } = props;

  const [name, setName] = useState("");
  const [totalAnnualLeaveDate, setTotalAnnualLeaveDate] = useState("");
  const [maximumDaysOffPerMonth, setMaximumDaysOffPerMonth] = useState("");
  const [description, setDescription] = useState("");
  const [isHoliday, setIsHoliday] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());

  console.log(dataUpdate);


  useEffect(() => {
    if (showUpdate) {
      setName(dataUpdate.name);
      setTotalAnnualLeaveDate(dataUpdate.totalAnnualLeaveDate);
      setMaximumDaysOffPerMonth(dataUpdate.maximumDaysOffPerMonth);
      setDescription(dataUpdate.description);
      setIsHoliday(dataUpdate.isHoliday);
      setStartDate(dataUpdate.startDate);
      setEndDate(dataUpdate.endDate);
    }
  }, [dataUpdate, showUpdate]);

  const reSetForm = () => {
    setName("");
    setTotalAnnualLeaveDate("");
    setMaximumDaysOffPerMonth("");
    setDescription("");
    setIsHoliday(false);
  };

  const handleClose = () => {
    setShowUpdate(false);
    reSetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      name === "" ||
      totalAnnualLeaveDate === "" ||
      maximumDaysOffPerMonth === "" ||
      description === ""
    ) {
      valid = false;
    }
    return valid;
  };

  const handleUpdateLeaveDate = async () => {
    if (validateForm()) {
      const leaveDate = {
        name,
        totalAnnualLeaveDate,
        maximumDaysOffPerMonth,
        description,
        isHoliday,
        startDate: isHoliday ? startDate : null,
        endDate: isHoliday ? endDate : null,
      };

      let res = await updateLeaveDate(dataUpdate.id, leaveDate);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListLeaveDate("", 1, 10);
        toast.success("Sửa thành công.");
      } else {
        toast.error("Lỗi khi sửa.");
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
        <Modal.Title>Sửa ngày nghỉ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">
              Tên ngày nghỉ
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhâp tên ngày nghỉ"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Số ngày nghỉ trong năm
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Số ngày nghỉ trong năm"
              value={totalAnnualLeaveDate}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setTotalAnnualLeaveDate(value);
                }
              }}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                  toast.error("Vui lòng nhập số");
                }
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Số ngày nghỉ tối đa trong tháng
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Số ngày nghỉ tối đa trong tháng"
              value={maximumDaysOffPerMonth}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setMaximumDaysOffPerMonth(value);
                }
              }}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                  toast.error("Vui lòng nhập số");
                }
              }}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">
              Mô tả
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Mô tả"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <Form.Group controlId="formIsHoliday">
            <Form.Check
              type="switch"
              label="Ngày lễ"
              checked={isHoliday}
              onChange={(e) => setIsHoliday(e.target.checked)}
            />
            {isHoliday && (
              <>
                <div className="col-md-12">
                  <label className="form-label">
                    Ngày bắt đầu
                    <span className="valid">*</span>
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Chọn ngày bắt đầu"
                    wrapperClassName="w-100"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">
                    Ngày kết thúc
                    <span className="valid">*</span>
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Chọn ngày kết thúc"
                    wrapperClassName="w-100"
                    minDate={startDate}
                  />
                </div>
              </>
            )}
          </Form.Group>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleUpdateLeaveDate}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateLeaveDate;
