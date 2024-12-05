import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteLevel } from "../../../../../services/LevelService";
import "./DeleteLevelStyle.scss";
const DeleteLevel = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListLevel } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteLevel = async () => {
    try {
      const res = await deleteLevel(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa Level thành công!");
        handleClose();
        await fetchListLevel("", 1, 10);
      } else {
        toast.error(res.message || "Lỗi khi xóa Level");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Có lỗi xảy ra khi xóa Level");
    }
  };
  return (
    <Modal
      show={showDelete}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Xóa Level</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa Level này?
          <br />
          <b>Level: {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteLevel}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteLevel;
