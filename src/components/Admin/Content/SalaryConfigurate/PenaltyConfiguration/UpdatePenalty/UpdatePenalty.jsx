import React, { useEffect, useState } from "react";
import "./UpdatePenaltyStyle.scss";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updatePenalty } from "../../../../../../services/PenaltyService";

const UpdatePenalty = (props) => {
  const {
    showUpdate,
    setShowUpdate,
    fetchListPenalty,
    workPlaces,
    typeOfPenalty,
    loaiPhat,
    dataUpdate,
  } = props;

  const [selectedTypeOfPenalty, setSelectedTypeOfPenalty] = useState(0);

  const [money, setMoney] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString());
  const [note, setNote] = useState("");
  const [isAllWorkPlace, setIsAllWorkPlace] = useState(true);
  const [workPlaceId, setWorkPlaceId] = useState("");
  const penaltyTypeMapping = {
    Dimuon: 0,
    Vesom: 1,
    Tunghikhongphep: 2,
    Nghiquangayphep: 3,
    RaNgoaiQuaGio: 4,
  };

  useEffect(() => {
    if (showUpdate) {
      setSelectedTypeOfPenalty(penaltyTypeMapping[dataUpdate.typeOfPenalty]);
      setMoney(dataUpdate.money);
      setEffectiveDate(dataUpdate.effectiveDate);
      setNote(dataUpdate.note);
      setIsAllWorkPlace(dataUpdate.isAllWorkPlace);

      if (
        dataUpdate.isAllWorkPlace === true ||
        dataUpdate.isAllWorkPlace === "Tất cả nơi làm việc"
      ) {
        setIsAllWorkPlace(true);
        setWorkPlaceId("");
      } else {
        setIsAllWorkPlace(false);
        const activeWorkPlace =
          dataUpdate.workPlaceAndAllowanceAndPenalties.find(
            (wp) => wp.status === "Active"
          );
        setWorkPlaceId(activeWorkPlace?.workPlace?.id || "");
      }
    }
  }, [dataUpdate, showUpdate]);

  const reSetForm = () => {
    setMoney("");
    setEffectiveDate("");
    setNote("");
    setIsAllWorkPlace("");
    setWorkPlaceId("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    reSetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      !selectedTypeOfPenalty === "" ||
      money === "" ||
      effectiveDate === "" ||
      note === ""
    ) {
      valid = false;
    }

    return valid;
  };

  const handleUpdatePenalty = async () => {
    if (validateForm()) {
      const penalty = {
        typeOfPenalty: parseInt(selectedTypeOfPenalty, 10),
        money: parseFloat(money), // Đảm bảo gửi giá trị tiền là số
        effectiveDate: effectiveDate,
        note: note,
        isAllWorkPlace: isAllWorkPlace,
        workPlaceId: isAllWorkPlace ? null : workPlaceId, // Nếu chọn tất cả nơi làm việc thì gửi null
      };

      let res = await updatePenalty(dataUpdate.id, penalty);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListPenalty("", "", 1, 10);
        toast.success("Sửa thành công .");
      } else {
        toast.error("Lỗi khi Sửa.");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ các trường có dấu sao đỏ.");
    }
  };

  return (
    <>
      <Modal
        show={showUpdate}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật cấu hình phạt</Modal.Title>
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
                {typeOfPenalty.map((Penalty) => (
                  <option key={Penalty.value} value={Penalty.value}>
                    {loaiPhat[Penalty.value]}
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
                placeholder="Nhập số tiền phụ cấp"
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
                selected={effectiveDate ? new Date(effectiveDate) : null} // Sửa tương tự như các trường khác
                onChange={(date) =>
                  setEffectiveDate(date ? date.toISOString() : null)
                }
                dateFormat="dd-MM-yyyy"
                className="form-control"
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
          <Button variant="primary" onClick={() => handleUpdatePenalty()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePenalty;
