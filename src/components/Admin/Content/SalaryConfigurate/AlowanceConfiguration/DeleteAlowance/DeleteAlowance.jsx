import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteAlowance } from "../../../../../../services/AlowanceService";
import "./DeleteAlowanceStyle.scss";

const DeleteAlowance = (props) => {
  const {
    showDelete,
    setShowDelete,
    dataDelete,
    fetchListAlowance,
    loaiPhuCap,
  } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteAlowance = async () => {
    try {
      const res = await deleteAlowance(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa phụ cấp thành công!");
        handleClose();
        await fetchListAlowance("", "", 1, 10);
      } else {
        toast.error(res.detail || "Lỗi khi xóa phụ cấp");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa phụ cấp");
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
        <Modal.Title>Xóa phụ cấp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa phụ cấp này?
          <br />
          <b>
            Phụ cấp:{" "}
            {dataDelete && dataDelete.typeOfAllowance
              ? dataDelete.typeOfAllowance
              : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteAlowance}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAlowance;
