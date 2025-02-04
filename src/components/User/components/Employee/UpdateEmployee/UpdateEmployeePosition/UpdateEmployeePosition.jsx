import React, { useEffect, useState } from "react";
import {
  updateEmployeePosition,
  getEmployeeById,
} from "../../../../../../services/EmployeeService";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import "./UpdateEmployeePositionStyle.scss";

const UpdateEmployeePosition = (props) => {
  const {
    showUpdate,
    setShowUpdate,
    fetchListEmployee,
    dataUpdate,
    positions,
  } = props;
  const [employeeId, setEmployeeId] = useState("");
  const [maNv, setMaNv] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [newPosition, setNewPosition] = useState("");

  const resetForm = () => {
    setEmployeeId("");
    setEmployeeName("");
    setCurrentPosition("");
    setNewPosition("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (newPosition === "") {
      valid = false;
    }
    return valid;
  };
  const handleUpdatePosition = async () => {
    if (validateForm()) {
      const positionData = {
        positionId: newPosition,
      };

      try {
        const res = await updateEmployeePosition(dataUpdate.id, positionData);
        console.log("res", res);
        if (res.isSuccess) {
          toast.success("Cập nhật chức vụ thành công.");
          handleClose();
          fetchListEmployee("", "", "", "", "", 1, 10);
        } else {
          const errorMessage =
            res.errors?.[0]?.message || "Lỗi khi cập nhật chức vụ.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật chức vụ.");
      }
    }
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setEmployeeId(dataUpdate.id || "");
      setMaNv(dataUpdate.maNv || "");
      setEmployeeName(dataUpdate.name || "");
      setCurrentPosition(
        dataUpdate.employeePositions?.[0]?.position.name || ""
      );
      setNewPosition("");
    }
  }, [dataUpdate, showUpdate]);

  return (
    <>
      <Modal
        show={showUpdate}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-create"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật chức vụ nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Mã nhân viên</label>
              <input
                type="text"
                className="form-control"
                value={maNv}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Tên nhân viên</label>
              <input
                type="text"
                className="form-control"
                value={employeeName}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Chức vụ hiện tại</label>
              <input
                type="text"
                className="form-control"
                value={currentPosition}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Chức vụ mới</label>
              <select
                className="form-select"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
              >
                <option value="">Chọn chức vụ</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdatePosition}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEmployeePosition;
