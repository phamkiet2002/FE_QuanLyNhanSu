import React, { useState } from "react";
import "./CreateLeaveDateStyle.scss";
import { createLeaveDate } from "../../../../../services/LeaveDateService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setDate } from "date-fns";

const CreateLeaveDate = (props) => {
  const { showCreate, setShowCreate, fetchListLeaveDate } = props;

  const [name, setName] = useState("");
  const [totalAnnualLeaveDate, setTotalAnnualLeaveDate] = useState("");
  const [maximumDaysOffPerMonth, setMaximumDaysOffPerMonth] = useState("");
  const [description, setDescription] = useState("");

  const reSetForm = (props) => {
    setName("");
    setTotalAnnualLeaveDate("");
    setMaximumDaysOffPerMonth("");
    setDescription("");
  };

  const handleClose = () => {
    setShowCreate(false);
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

  const handleCreateLeaveDate = async () => {
    if (validateForm()) {
      const leaveDate = {
        name,
        totalAnnualLeaveDate,
        maximumDaysOffPerMonth,
        description,
      };
      let res = await createLeaveDate(leaveDate);
      console.log(res);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListLeaveDate("", 1, 10);
        toast.success("Thêm thành công.");
      } else {
        toast.error("Lỗi khi thêm.");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ các trường có dấu sao đỏ.");
    }
  };

  return (
    <>
      <Modal
        show={showCreate}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới ngày nghỉ</Modal.Title>
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
                    alert("Vui lòng nhập số");
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
                    alert("Vui lòng nhập số");
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bỏ qua
          </Button>
          <Button variant="primary" onClick={() => handleCreateLeaveDate()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateLeaveDate;
