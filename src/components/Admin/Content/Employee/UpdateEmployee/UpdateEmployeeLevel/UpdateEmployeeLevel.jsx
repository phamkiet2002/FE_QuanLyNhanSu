import React, { useEffect, useState } from "react";
import {
  updateEmployeeLevel,
  getEmployeeById,
} from "../../../../../../services/EmployeeService";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import "./UpdateEmployeeLevelStyle.scss";

const UpdateEmployeeLevel = (props) => {
  const { showUpdate, setShowUpdate, levels, fetchListEmployee, dataUpdate } =
    props;
  const [employeeId, setEmployeeId] = useState("");
  const [maNV, setMaNv] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [newLevel, setNewLevel] = useState("");

  const resetForm = () => {
    setEmployeeId("");
    setEmployeeName("");
    setCurrentLevel("");
    setNewLevel("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (newLevel === "") {
      valid = false;
    }
    return valid;
  };
  const handleUpdateLevel = async () => {
    if (validateForm()) {
      const levelData = {
        levelId: newLevel,
      };

      try {
        const res = await updateEmployeeLevel(employeeId, levelData);
        console.log("res", res);
        if (res.isSuccess) {
          toast.success("Cập nhật level thành công.");
          handleClose();
          fetchListEmployee("", "", "", "", "", 0, 1, 10);
        } else {
          const errorMessage =
            res.errors?.[0]?.message || "Lỗi khi cập nhật level.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật level.");
      }
    }
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setEmployeeId(dataUpdate.id || "");
      setMaNv(dataUpdate.maNV || "");
      setEmployeeName(dataUpdate.name || "");
      setCurrentLevel(dataUpdate.employeeLevels?.[0]?.level.name || "");
      setNewLevel("");
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
          <Modal.Title>Thay đổi Level nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Mã Nhân viên</label>
              <input
                type="text"
                className="form-control"
                value={maNV}
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
              <label className="form-label">Level hiện tại</label>
              <input
                type="text"
                className="form-control"
                value={currentLevel}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Level mới <span className="valid">*</span>
              </label>
              <select
                className="form-select"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
              >
                <option value="">Chọn Level</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bỏ qua
          </Button>
          <Button variant="primary" onClick={handleUpdateLevel}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEmployeeLevel;
