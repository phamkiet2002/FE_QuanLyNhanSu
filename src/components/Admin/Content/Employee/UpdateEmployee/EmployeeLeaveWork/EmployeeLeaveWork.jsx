import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { employeeLeaveWork } from "../../../../../../services/EmployeeService";
import "./EmployeeLeaveWorkStyle.scss";

const EmployeeLeaveWork = (props) => {
  const { showDelete, setShowDelete, dataDelete, fetchListEmployee } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleEmployeeLeaveWork = async () => {
    try {
      const res = await employeeLeaveWork(dataDelete.id);

      if (res && res.isSuccess) {
        toast.success("Nhân viên đã được cho nghỉ việc.");
        handleClose();
        await fetchListEmployee("", "", "", "", "", 0, 1, 10);
      } else {
        toast.error(res.errors?.[0]?.message || "Lỗi khi cho nghỉ việc.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cho nghỉ việc.");
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
        <Modal.Title>Cho nghỉ việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          Bạn có chắc chắn muốn cho nhân viên này nghỉ việc?
          <br />
          <b>
            Nhân viên: {dataDelete && dataDelete.name ? dataDelete.name : ""}
          </b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleEmployeeLeaveWork}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeLeaveWork;
