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
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(
          "Không thể xóa cấp bậc này vì đang được sử dụng cho nhân viên!"
        );
      } else {
        toast.error("Có lỗi xảy ra khi xóa cấp bậc!");
      }
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
