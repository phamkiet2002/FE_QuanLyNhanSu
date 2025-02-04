import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deletePosition } from "../../../../../services/PositionService";
import "./DeletePositionStyle.scss";

const DeletePosition = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListPosition } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeletePosition = async () => {
    try {
      const res = await deletePosition(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa chức vụ thành công!");
        handleClose();
        await fetchListPosition("", 1, 10);
      } else {
        toast.error(res.detail || "Không thể xóa vị trí vì đang có nhân viên.");
      }
    } catch (error) {
      console.error("Exception occurred:", error);
      toast.error("Có lỗi xảy ra khi xóa chức vụ");
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
        <Modal.Title>Xóa chức vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa chức vụ này?
          <br />
          <b>Chức vụ: {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeletePosition}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePosition;
