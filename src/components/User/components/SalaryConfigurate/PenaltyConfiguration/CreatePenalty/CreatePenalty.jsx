import React, { useState } from "react";
import "./CreatePenaltyStyle.scss";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPenalty } from "../../../../../../services/PenaltyService";

const CreatePenalty = (props) => {
  const {
    showCreate,
    setShowCreate,
    fetchListPenalty,
    workPlaces,
    typeOfPenalty1,
    loaiPhat,
  } = props;

  const [selectedTypeOfPenalty, setSelectedTypeOfPenalty] = useState(0);

  const [money, setMoney] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString());
  const [note, setNote] = useState("");
  const [isAllWorkPlace, setIsAllWorkPlace] = useState(true);
  const [workPlaceId, setWorkPlaceId] = useState("");

  const reSetForm = () => {
    setMoney("");
    setEffectiveDate("");
    setNote("");
    setIsAllWorkPlace("");
    setWorkPlaceId("");
  };

  const handleClose = () => {
    setShowCreate(false);
    reSetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      selectedTypeOfPenalty === "" ||
      money === "" ||
      effectiveDate === "" ||
      note === ""
    ) {
      valid = false;
    }

    return valid;
  };

  const handleCreatePenalty = async () => {
    if (validateForm()) {
      const penalty = {
        typeOfPenalty: parseInt(selectedTypeOfPenalty, 10),
        money: parseFloat(money), // Đảm bảo gửi giá trị tiền là số
        effectiveDate: effectiveDate,
        note: note,
        isAllWorkPlace: isAllWorkPlace,
        workPlaceId: isAllWorkPlace ? null : workPlaceId, // Nếu chọn tất cả nơi làm việc thì gửi null
      };

      let res = await createPenalty(penalty);
      console.log(res);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListPenalty("", "", 1, 10);
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
          <Modal.Title>Thêm cấu hình phạt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">
                Loại phạt
                <span className="valid">*</span>
              </label>
              <Form.Select
                value={selectedTypeOfPenalty || 0}
                onChange={(e) => setSelectedTypeOfPenalty(e.target.value)}
              >
                {typeOfPenalty1.map((penalty) => (
                  <option key={penalty.value} value={penalty.value}>
                    {loaiPhat[penalty.value]}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="col-md-12">
              <label className="form-label">
                Nơi làm việc
                <span className="valid">*</span>
              </label>
              <Form.Select
                value={isAllWorkPlace ? "true" : workPlaceId || ""}
                onChange={(e) => {
                  if (e.target.value === "true") {
                    setIsAllWorkPlace(true);
                    setWorkPlaceId(null);
                  } else {
                    setIsAllWorkPlace(false);
                    setWorkPlaceId(e.target.value);
                  }
                }}
              >
                <option value="true">Tất cả nơi làm việc</option>
                {workPlaces.map((workPlace) => (
                  <option key={workPlace.id} value={workPlace.id}>
                    {workPlace.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Số tiền phạt
                <span className="valid">*</span>
              </label>
              <NumericFormat
                type="text"
                thousandSeparator=","
                suffix=" VND"
                className="form-control"
                placeholder="Nhập số tiền phạt"
                value={money}
                maxLength={21}
                onValueChange={(values) => {
                  const numericValue = values.value
                    .replace(/,/g, "")
                    .replace(" VND", "");
                  setMoney(numericValue);
                }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Ngày hiệu lực
                <span className="valid">*</span>
              </label>
              <DatePicker
                selected={effectiveDate ? new Date(effectiveDate) : new Date()}
                onChange={(date) => setEffectiveDate(date.toISOString())}
                dateFormat="dd-MM-yyyy"
                className="form-control "
                placeholderText="Chọn ngày"
                wrapperClassName="w-100"
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
                placeholder="Nhập mô tả"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bỏ qua
          </Button>
          <Button variant="primary" onClick={() => handleCreatePenalty()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePenalty;
