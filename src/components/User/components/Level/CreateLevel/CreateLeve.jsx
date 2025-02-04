import React, { useState } from "react";
import "./CreateLevelStyle.scss";
import { createLevel } from "../../../../../services/LevelService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CreateLeve = (props) => {
  const { showCreate, setShowCreate, fetchListLevel } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setShowCreate(false);
    reSetForm();
  };

  const reSetForm = () => {
    setName("");
    setDescription("");
  };

  const validateForm = () => {
    let valid = true;
    if (name === "" || description === "") {
      valid = false;
    }
    return valid;
  };

  const handleCreateLevel = async () => {
    if (validateForm()) {
      const level = { name, description };
      let res = await createLevel(level);
      console.log(res);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListLevel("", 1, 10);
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
          <Modal.Title>Thêm mới level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">
                Tên level
                <span className="valid">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhâp tên level"
                value={name}
                onChange={(event) => setName(event.target.value)}
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
          <Button variant="primary" onClick={() => handleCreateLevel()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateLeve;
