import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deletePenalty } from "../../../../../../services/PenaltyService";
import "./DeletePenaltyStyle.scss";

const DeletePenalty = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListPenalty } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeletePenalty = async () => {
    try {
      const res = await deletePenalty(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa hình phạt thành công!");
        handleClose();
        await fetchListPenalty("", "", 1, 10);
      } else {
        toast.error(res.detail || "Lỗi khi xóa hình phạt");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa hình phạt");
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
        <Modal.Title>Xóa hình phạt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa hình phạt này?
          <br />
          <b>
            Hình phạt:{" "}
            {dataDelete && dataDelete.typeOfPenalty
              ? dataDelete.typeOfPenalty
              : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeletePenalty}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePenalty;
