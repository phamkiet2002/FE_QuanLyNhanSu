import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteWorkPlace } from "../../../../../services/WorkplaceService";
import "./DeleteWorkPlaceStyle.scss";

const DeleteWorkPlace = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListWorkPlace } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteWorkPlace = async () => {
    try {
      const res = await deleteWorkPlace(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Xóa điểm làm việc thành công!");
        handleClose();
        await fetchListWorkPlace("", 1, 10);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(
          "Không thể xóa điểm làm việc này vì còn nhân viên. Vui lòng chuyển nhân viên trước khi xóa!"
        );
      } else {
        toast.error("Có lỗi xảy ra khi xóa điểm làm việc!");
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
        <Modal.Title>Xóa điểm làm việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn xóa điểm làm việc này?
          <br />
          <b>
            Điểm làm việc:{" "}
            {dataDelete && dataDelete.name ? dataDelete.name : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteWorkPlace}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteWorkPlace;
