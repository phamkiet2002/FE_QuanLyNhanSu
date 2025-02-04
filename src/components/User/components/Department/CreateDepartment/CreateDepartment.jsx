import React, { useEffect, useState } from "react";
import "./CreateDepartmentStyle.scss";
import { createDepartment } from "../../../../../services/DepartmentService";
import { getAllWorkShedule } from "../../../../../services/WorkScheduleService";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";

const CreateDepartment = (props) => {
  const {
    showCreate,
    setShowCreate,
    fetchListDepartment,
    fetchWorkPlace,
    workPlaces,
  } = props;

  const [workShedules, setWorkShedules] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workPlaceId, setWorkPlaceId] = useState("");
  const [workSheduleId, setWorkSheduleId] = useState("");

  const reSetForm = () => {
    setName("");
    setDescription("");
    setWorkPlaceId("");
    setWorkSheduleId("");
  };

  const handleClose = () => {
    setShowCreate(false);
    reSetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      name === "" ||
      description === "" ||
      workPlaceId === "" ||
      workSheduleId === ""
    ) {
      valid = false;
    }
    return valid;
  };

  const handleCreateDepartment = async () => {
    if (validateForm()) {
      const department = { name, description, workPlaceId, workSheduleId };
      let res = await createDepartment(department);
      console.log(res);
      if (res.isSuccess === true) {
        handleClose();
        reSetForm();
        fetchListDepartment("", "", 1, 10);
        toast.success("Thêm thành công.");
      } else {
        toast.error("Lỗi khi thêm.");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ các trường có dấu sao đỏ.");
    }
  };

  useEffect(() => {
    fetchWorkPlace();
    fetchWorkShedule();
  }, []);

  const fetchWorkShedule = async () => {
    try {
      let res = await getAllWorkShedule("", 1, 100);
      setWorkShedules(res.value.items);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <Modal
        show={showCreate}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới phòng ban</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">
                Tên phòng ban
                <span className="valid">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhâp tên điểm làm việc"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Nơi làm việc
                <span className="valid">*</span>
              </label>
              <Form.Select
                value={workPlaceId || ""}
                onChange={(e) => {
                  setWorkPlaceId(e.target.value);
                }}
              >
                <option value="" disabled>
                  Chọn nơi làm việc
                </option>
                {workPlaces.map((workPlace) => (
                  <option key={workPlace.id} value={workPlace.id}>
                    {workPlace.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Thời gian làm việc
                <span className="valid">*</span>
              </label>
              <Form.Select
                value={workSheduleId || ""}
                onChange={(e) => {
                  setWorkSheduleId(e.target.value);
                }}
              >
                <option value="" disabled>
                  Chọn thời gian làm việc
                </option>
                {workShedules.map((workShedule) => (
                  <option key={workShedule.id} value={workShedule.id}>
                    {workShedule.startTime} - {workShedule.endTime}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Mô tả
                <span className="valid">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mô tả"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bỏ qua
          </Button>
          <Button variant="primary" onClick={() => handleCreateDepartment()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateDepartment;
