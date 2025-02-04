import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteWorkSchedule } from "../../../../../services/WorkScheduleService";
import "./DeleteWorkScheduleStyle.scss";

const DeleteWorkSchedule = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListWorkSchedule } =
    props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteWorkSchedule = async () => {
    try {
      const res = await deleteWorkSchedule(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa thời gian làm việc thành công!");
        handleClose();
        await fetchListWorkSchedule("", 1, 10);
      } else {
        toast.error(res.detail || "Lỗi khi xóa thời gian làm việc");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa thời gian làm việc");
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
        <Modal.Title>Xóa thời gian làm việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa thời gian làm việc này?
          <br />
          <b>
            Thời gian làm việc:{" "}
            {dataDelete && dataDelete.name ? dataDelete.name : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteWorkSchedule}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteWorkSchedule;
