import React, { useEffect, useState } from "react";
import {
  updateEmployeeSalary,
  getEmployeeById,
} from "../../../../../../services/EmployeeService";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import "./UpdateEmployeeSalaryStyle.scss";

const UpdateEmployeeSalary = (props) => {
  const { showUpdate, setShowUpdate, fetchListEmployee, dataUpdate } = props;
  const [employeeId, setEmployeeId] = useState("");
  const [maNV, setMaNv] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [newSalary, setNewSalary] = useState("");

  const resetForm = () => {
    setEmployeeId("");
    setEmployeeName("");
    setCurrentSalary("");
    setNewSalary("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (newSalary === "") {
      valid = false;
    }
    return valid;
  };
  const handleUpdateSalary = async () => {
    if (validateForm()) {
      const salary = {
        salarys: parseFloat(newSalary),
        status: "Active",
      };

      try {
        const res = await updateEmployeeSalary(employeeId, salary);
        console.log("res", res);
        if (res.isSuccess) {
          toast.success("Cập nhật lương thành công.");
          handleClose();
          fetchListEmployee("", "", "", "", "", 0, 1, 10);
        } else {
          const errorMessage =
            res.errors?.[0]?.message || "Lỗi khi cập nhật lương.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật lương.");
      }
    }
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setEmployeeId(dataUpdate.id || "");
      setMaNv(dataUpdate.maNV || "");
      setEmployeeName(dataUpdate.name || "");
      const activeSalary =
        dataUpdate.salarys?.find((s) => s.status === "Active")?.salarys || 0;
      setCurrentSalary(activeSalary);
      setNewSalary("");
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
          <Modal.Title>Cập nhật lương nhân viên</Modal.Title>
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
              <label className="form-label">Lương hiện tại</label>
              <NumericFormat
                className="form-control"
                value={currentSalary}
                thousandSeparator=","
                suffix=" VND"
                disabled
                displayType="text"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Lương mới <span className="valid">*</span>
              </label>
              <NumericFormat
                className="form-control"
                value={newSalary}
                thousandSeparator=","
                suffix=" VND"
                placeholder="Nhập lương mới"
                onValueChange={(values) => {
                  setNewSalary(values.value);
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bỏ qua
          </Button>
          <Button variant="primary" onClick={handleUpdateSalary}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEmployeeSalary;
