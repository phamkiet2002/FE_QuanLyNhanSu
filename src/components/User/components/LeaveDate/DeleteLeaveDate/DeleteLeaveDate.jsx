import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteLeaveDate } from "../../../../../services/LeaveDateService";
import "./DeleteLeaveDateStyle.scss";

const DeleteLeaveDate = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListLeaveDate } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteLeaveDate = async () => {
    try {
      const res = await deleteLeaveDate(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa ngày nghỉ thành công!");
        handleClose();
        await fetchListLeaveDate("", 1, 10);
      } else {
        toast.error(res.detail || "Lỗi khi xóa ngày nghỉ");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa ngày nghỉ");
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
        <Modal.Title>Xóa ngày nghỉ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa ngày nghỉ này?
          <br />
          <b>
            Ngày nghỉ: {dataDelete && dataDelete.name ? dataDelete.name : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteLeaveDate}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteLeaveDate;
