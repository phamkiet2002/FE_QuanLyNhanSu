import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./DeleteAttendanceSettingStyle.scss";
import { deleteAttendanceSetting } from "../../../../../../services/AttendanceSetting";

const DeleteAttendanceSetting = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListAttendanceSetting } = props;
  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteAttendanceSetting = async () => {
    try {
      const res = await deleteAttendanceSetting(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa Câu hình chấm công thành công!");
        handleClose();
        await fetchListAttendanceSetting("", 1, 10);
      } else {
        toast.error(res.detail || "Lỗi khi xóa Câu hình chấm công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa Câu hình chấm công");
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
        <Modal.Title>Xóa Câu hình chấm công</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa Câu hình chấm công này?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteAttendanceSetting}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAttendanceSetting;
