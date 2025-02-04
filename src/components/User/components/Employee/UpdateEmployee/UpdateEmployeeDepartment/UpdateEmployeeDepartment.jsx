import React, { useEffect, useState } from "react";
import {
  updateEmployeeDepartment,
  getEmployeeById,
} from "../../../../../../services/EmployeeService";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import "./UpdateEmployeeDepartmentStyle.scss";

const UpdateEmployeeDepartment = (props) => {
  const {
    showUpdate,
    setShowUpdate,
    departments,
    fetchListEmployee,
    dataUpdate,
  } = props;
  const [employeeId, setEmployeeId] = useState("");
  const [maNv, setMaNv] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  const resetForm = () => {
    setEmployeeId("");
    setEmployeeName("");
    setCurrentDepartment("");
    setNewDepartment("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (newDepartment === "") {
      valid = false;
    }
    return valid;
  };
  const handleUpdateDepartment = async () => {
    if (validateForm()) {
      const departmentData = {
        departmentId: newDepartment,
      };

      try {
        const res = await updateEmployeeDepartment(
          dataUpdate.id,
          departmentData
        );
        console.log("res", res);
        if (res.isSuccess) {
          toast.success("Cập nhật phòng ban thành công.");
          handleClose();
          fetchListEmployee("", "", "", "", "", 1, 10);
        } else {
          const errorMessage =
            res.errors?.[0]?.message || "Phòng ban này không có trong nơi làm việc của bạn.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật phòng ban.");
      }
    }
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setEmployeeId(dataUpdate.id || "");
      setMaNv(dataUpdate.maNv || "");
      setEmployeeName(dataUpdate.name || "");
      setCurrentDepartment(
        dataUpdate.employeeDepartments?.[0]?.department.name || ""
      );
      setNewDepartment("");
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
          <Modal.Title>Thay đổi phòng ban nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Mã Nhân viên</label>
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
              <label className="form-label">Phòng ban hiện tại</label>
              <input
                type="text"
                className="form-control"
                value={currentDepartment}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Phòng ban mới <span className="valid">*</span>
              </label>
              <select
                className="form-select"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              >
                <option value="">Chọn Phòng ban</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
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
          <Button variant="primary" onClick={handleUpdateDepartment}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEmployeeDepartment;
