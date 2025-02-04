import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteDepartment } from "../../../../../services/DepartmentService";
import "./DeleteDepartmentStyle.scss";

const DeleteDepartment = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListDepartment } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteDepartment = async () => {
    try {
      const res = await deleteDepartment(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa phòng ban thành công!");
        handleClose();
        await fetchListDepartment("", "", 1, 10);
      } else {
        toast.error(res.detail || "Lỗi khi xóa phòng ban");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa phòng ban");
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
        <Modal.Title>Xóa phòng ban</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa phòng ban này?
          <br />
          <b>
            Phòng ban: {dataDelete && dataDelete.name ? dataDelete.name : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteDepartment}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteDepartment;
