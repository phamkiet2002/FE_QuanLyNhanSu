import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { createEmloyee } from "../../../../../services/EmployeeService";
import DatePicker from "react-datepicker";
import { NumericFormat } from "react-number-format";
import "./CreateEmployeeStyle.scss";
import { set } from "lodash";

const CreateEmployee = (props) => {
  const {
    showCreate,
    setShowCreate,
    workPlaces,
    departments,
    positions,
    levels,
    fetchListEmployee,
  } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [address, setAddress] = useState("");
  const [joinDate, setJoinDate] = useState(new Date().toISOString());
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [workPlaceId, setWorkPlaceId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [salarys, setSalarys] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIdentityCard("");
    setGender("");
    setDateOfBirth("");
    setAddress("");
    setJoinDate("");
    setBankName("");
    setBankAccountNumber("");
    setWorkPlaceId("");
    setDepartmentId("");
    setPositionId("");
    setLevelId("");
    setSalarys("");
  };

  const handleClose = () => {
    setShowCreate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      identityCard === "" ||
      gender === "" ||
      dateOfBirth === "" ||
      address === "" ||
      joinDate === "" ||
      bankName === "" ||
      bankAccountNumber === ""
    ) {
      valid = false;
    }
    return valid;
  };

  const handleCreateEmployee = async () => {
    if (validateForm()) {
      const employee = {
        name,
        email,
        phone,
        identityCard,
        gender,
        dateOfBirth,
        address,
        joinDate,
        bankName,
        bankAccountNumber,
        workPlaceId,
        departmentId,
        positionId,
        levelId,
        salarys,
      };

      try {
        const res = await createEmloyee(employee);
        console.log("Phản hồi từ API:", res);
        if (res.isSuccess === true) {
          handleClose();
          resetForm();
          fetchListEmployee("", "", "", "", "", 1, 10);
          toast.success("Thêm nhân viên thành công.");
        } else {
          toast.error("Lỗi khi thêm nhân viên.");
        }
      } catch (error) {
        console.error("Error creating employee:", error);
        toast.error("Lỗi khi thêm nhân viên.");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ các trường có dấu sao đỏ.");
    }
  };

  return (
    <Modal
      show={showCreate}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">
              Tên nhân viên
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên nhân viên"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Email<span className="valid">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Số điện thoại<span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              CMND/CCCD<span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value)}
              placeholder="Nhập CMND/CCCD"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Giới tính<span className="valid">*</span>
            </label>
            <Form.Select
              value={gender}
              onChange={(e) => setGender(parseInt(e.target.value))}
            >
              <option value="">Chọn giới tính</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </Form.Select>
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Ngày sinh<span className="valid">*</span>
            </label>
            <DatePicker
              selected={dateOfBirth ? new Date(dateOfBirth) : new Date()}
              onChange={(date) => setDateOfBirth(date.toISOString())}
              dateFormat="dd-MM-yyyy"
              className="form-control "
              placeholderText="Chọn ngày"
              wrapperClassName="w-100"
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">
              Địa chỉ<span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Ngày vào làm<span className="valid">*</span>
            </label>
            <DatePicker
              selected={joinDate ? new Date(joinDate) : new Date()}
              onChange={(date) => setJoinDate(date.toISOString())}
              dateFormat="dd-MM-yyyy"
              className="form-control "
              placeholderText="Chọn ngày"
              wrapperClassName="w-100"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Tên ngân hàng<span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Nhập tên ngân hàng"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Số tài khoản<span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              placeholder="Nhập số tài khoản"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Nơi làm việc<span className="valid">*</span>
            </label>
            <Form.Select
              value={workPlaceId}
              onChange={(e) => setWorkPlaceId(e.target.value)}
            >
              <option value="">Chọn nơi làm việc</option>
              {workPlaces.map((workplace) => (
                <option key={workplace.id} value={workplace.id}>
                  {workplace.name}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Phòng ban<span className="valid">*</span>
            </label>
            <Form.Select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">Chọn phòng ban</option>
              {departments
                .filter((department) => department.workPlace.id === workPlaceId)
                .map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </Form.Select>
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Chức vụ<span className="valid">*</span>
            </label>
            <Form.Select
              value={positionId}
              onChange={(e) => setPositionId(e.target.value)}
            >
              <option value="">Chọn chức vụ</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Level<span className="valid">*</span>
            </label>
            <Form.Select
              value={levelId}
              onChange={(e) => setLevelId(e.target.value)}
            >
              <option value="">Chọn level</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Lương
              <span className="valid">*</span>
            </label>
            <NumericFormat
              type="text"
              thousandSeparator=","
              suffix=" VND"
              className="form-control"
              placeholder="0"
              value={salarys}
              maxLength={21}
              onValueChange={(values) => {
                const numericValue = values.value
                  .replace(/,/g, "")
                  .replace(" VND", "");
                setSalarys(numericValue);
              }}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleCreateEmployee}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEmployee;
