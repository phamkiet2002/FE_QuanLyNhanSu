import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateAbsent } from "../../../../../services/AttendanceService";

const UpdateAbsent = (props) => {
  const { showModal, setShowModal, selectedAttendance, fetchAttendanceData } = props;
  
  const handleClose = () => {
    setShowModal(false);
  };

  const handleUpdateAbsent = async () => {
    try {
      const data = {
        id: selectedAttendance.id,
        isAbsent: false,
      };

      const response = await updateAbsent(data);

      if (response.isSuccess) {
        toast.success("Cập nhật trạng thái vắng mặt thành công");
        handleClose();
        await fetchAttendanceData();
      } else {
        toast.error(response.message || "Lỗi khi cập nhật trạng thái vắng mặt");
      }
    } catch (error) {
      console.error("Update absent error:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái vắng mặt");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật trạng thái vắng mặt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có chắc chắn muốn xóa trạng thái vắng mặt cho ngày này không?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleUpdateAbsent}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAbsent;
