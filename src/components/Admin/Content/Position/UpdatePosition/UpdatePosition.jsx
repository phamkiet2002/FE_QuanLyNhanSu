import React, { useState, useEffect } from "react";
import "./UpdatePositionStyle.scss";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updatePosition } from "../../../../../services/PositionService";
import { getAllAppRole } from "../../../../../services/AppRoleService";

const UpdatePosition = (props) => {
  const { showUpdate, setShowUpdate, fetchListPosition, dataUpdate } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getAllAppRole(1, 100);
        if (res.isSuccess) {
          setRoles(res.value);
        } else {
          toast.error("Không thể tải danh sách quyền.");
        }
      } catch (error) {
        toast.error("Lỗi khi tải danh sách quyền.");
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      const currentRoleIds = dataUpdate.positionRoles?.map(
        (pr) => pr.appRole.id
      );
      setSelectedRoles(currentRoleIds);
    }
  }, [dataUpdate, showUpdate]);

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedRoles([]);
  };

  const validateForm = () => {
    return name !== "" && description !== "" && selectedRoles.length > 0;
  };

  const handleCheckboxChange = (roleId) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(roleId)
        ? prevSelectedRoles.filter((id) => id !== roleId)
        : [...prevSelectedRoles, roleId]
    );
  };

  const handleUpdatePosition = async () => {
    if (validateForm()) {
      const position = {
        name,
        description,
        roleIds: selectedRoles,
      };

      try {
        const res = await updatePosition(dataUpdate.id, position);

        if (res.isSuccess) {
          toast.success("Cập nhật chức vụ thành công!");
          await fetchListPosition("", 1, 10);
          setShowUpdate(false);
          resetForm();
        } else {
          toast.error(res.message || "Lỗi khi cập nhật chức vụ.");
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật chức vụ.");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <Modal
      show={showUpdate}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật chức vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">
              Tên chức vụ <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên chức vụ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">
              Mô tả <span className="valid">*</span>
            </label>
            <textarea
              className="form-control"
              placeholder="Nhập mô tả chức vụ"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">
              Quyền truy cập <span className="valid">*</span>
            </label>
            <div className="checkbox-list">
              {roles.map((role) => (
                <div key={role.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`role-${role.id}`}
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleCheckboxChange(role.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`role-${role.id}`}
                  >
                    <span style={{ fontWeight: "bold" }}>{role.name}</span> -{" "}
                    {role.description}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleUpdatePosition}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePosition;
