import React, { useEffect, useState } from "react";
import { updateEmployeeWorkPlace } from "../../../../../../services/EmployeeService";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import "./UpdateEmployeeWorkPlaceStyle.scss";
const UpdateEmployeeWorkplace = (props) => {
  const {
    showUpdate,
    setShowUpdate,
    fetchListEmployee,
    dataUpdate,
    workPlaces,
    departments,
  } = props;

  const [employeeId, setEmployeeId] = useState("");
  const [maNv, setMaNv] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  const [newWorkplace, setNewWorkplace] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const resetForm = () => {
    setEmployeeId("");
    setMaNv("");
    setEmployeeName("");
    setCurrentWorkplace("");
    setNewWorkplace("");
    setDepartmentId("");
  };

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (newWorkplace === "" || departmentId === "") {
      valid = false;
    }
    return valid;
  };

  const handleUpdateWorkplace = async () => {
    if (validateForm()) {
      const workplaceData = {
        workPlaceId: newWorkplace,
        departmentId: departmentId,
      };

      try {
        const res = await updateEmployeeWorkPlace(dataUpdate.id, workplaceData);
        console.log("res", res);
        if (res.isSuccess) {
          toast.success("Cập nhật nơi làm việc và phòng ban thành công.");
          handleClose();
          fetchListEmployee("", "", "", "", "", 1, 10);
        } else {
          const errorMessage =
            res.errors?.[0]?.message || "Lỗi khi cập nhật nơi làm việc.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật nơi làm việc.");
      }
    } else {
      toast.error("Vui lòng chọn đầy đủ nơi làm việc và phòng ban.");
    }
  };

  const handleWorkplaceChange = (workplaceId) => {
    setNewWorkplace(workplaceId);
    setDepartmentId("");
  };

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setEmployeeId(dataUpdate.id || "");
      setMaNv(dataUpdate.maNv || "");
      setEmployeeName(dataUpdate.name || "");
      setCurrentWorkplace(dataUpdate.workPlace?.name || "");
      setNewWorkplace(dataUpdate.workPlace?.id || "");
      setDepartmentId(dataUpdate.department?.id || "");
    }
  }, [dataUpdate, showUpdate]);

  return (
    <Modal
      show={showUpdate}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật nơi làm việc nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Mã nhân viên</label>
            <input type="text" className="form-control" value={maNv} disabled />
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
            <label className="form-label">Nơi làm việc hiện tại</label>
            <input
              type="text"
              className="form-control"
              value={currentWorkplace}
              disabled
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">
              Nơi làm việc mới<span className="valid">*</span>
            </label>
            <Form.Select
              value={newWorkplace}
              onChange={(e) => handleWorkplaceChange(e.target.value)}
            >
              <option value="">Chọn nơi làm việc</option>
              {workPlaces.map((workplace) => (
                <option key={workplace.id} value={workplace.id}>
                  {workplace.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-12">
            <label className="form-label">
              Phòng ban mới<span className="valid">*</span>
            </label>
            <Form.Select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">Chọn phòng ban</option>
              {departments
                .filter(
                  (department) => department.workPlace.id === newWorkplace
                )
                .map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </Form.Select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleUpdateWorkplace}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeWorkplace;
