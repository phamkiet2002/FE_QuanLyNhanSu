import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CreateWorkPlaceStyle.scss";
import { createWorkPlace } from "../../../../../services/WorkplaceService";
import { toast } from "react-toastify";

const CreateWorkPlace = (props) => {
  const { showCreate, setShowCreate, fetchListWorkPlace } = props;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const reSetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  const handleClose = () => {
    setShowCreate(false);
    reSetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (name === "" || phone === "" || email === "" || address === "") {
      valid = false;
    }
    return valid;
  };

  const handleCreateWorkPlace = async () => {
    if (validateForm()) {
      const workplace = { name, phone, email, address };
      let res = await createWorkPlace(workplace);
      console.log(res);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListWorkPlace("", 1, 10);
        toast.success("Thêm thành công.");
      } else {
        toast.error(res.errors.message||"Lỗi khi thêm.");
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
          <Modal.Title>Thêm mới điểm làm việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">
                Tên điểm làm việc
                <span className="valid">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhâp tên điểm làm việc"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Số điện thoại
                <span className="valid">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Email
                <span className="valid">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email của điểm làm việc"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Địa chỉ
                <span className="valid">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập địa chỉ của điểm làm việc"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bỏ qua
          </Button>
          <Button variant="primary" onClick={() => handleCreateWorkPlace()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateWorkPlace;
