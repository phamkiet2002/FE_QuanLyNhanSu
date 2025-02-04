import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { updateEmployeeInfo } from "../../../../../../services/EmployeeService";
import "./UpdateEmployeeInfoStyle.scss";

const UpdateEmployeeInfo = (props) => {
  const { showUpdate, setShowUpdate, dataUpdate, fetchListEmployee } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [address, setAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setName(dataUpdate.name || "");
      setEmail(dataUpdate.email || "");
      setPhone(dataUpdate.phone || "");
      setIdentityCard(dataUpdate.identityCard || "");
      setGender(dataUpdate.gender === "Nam" ? "0" : "1");
      setDateOfBirth(dataUpdate.dateOfBirth || new Date().toISOString());
      setAddress(dataUpdate.address || "");
      setBankName(dataUpdate.bankName || "");
      setBankAccountNumber(dataUpdate.bankAccountNumber || "");
    }
  }, [dataUpdate, showUpdate]);

  const handleClose = () => {
    setShowUpdate(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIdentityCard("");
    setGender("");
    setDateOfBirth(new Date().toISOString());
    setAddress("");
    setBankName("");
    setBankAccountNumber("");
  };

  const validateForm = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !identityCard ||
      !gender ||
      !dateOfBirth ||
      !address ||
      !bankName ||
      !bankAccountNumber
    ) {
      return false;
    }
    return true;
  };

  const handleUpdateEmployeeInfo = async () => {
    if (validateForm()) {
      const selectedDate = new Date(dateOfBirth);
      // Thêm 7 giờ để đảm bảo ngày không bị lệch khi chuyển sang UTC
      selectedDate.setHours(7, 0, 0, 0);
      const employeeInfo = {
        name,
        email,
        phone,
        identityCard,
        gender: gender === "0" ? 0 : 1,
        dateOfBirth: selectedDate.toISOString(),
        address,
        bankName,
        bankAccountNumber,
      };
      try {
        if (!dataUpdate.id) {
          toast.error("Không tìm thấy ID nhân viên");
          return;
        }
        const res = await updateEmployeeInfo(dataUpdate.id, employeeInfo);
        if (res.isSuccess) {
          toast.success("Cập nhật thông tin nhân viên thành công!");
          handleClose();
          await fetchListEmployee(dataUpdate.id);
        } else {
          toast.error(
            res.errors?.[0]?.message || "Lỗi khi cập nhật thông tin nhân viên"
          );
        }
      } catch (error) {
        toast.error("Lỗi cập nhật");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };

  return (
    <Modal
      show={showUpdate}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thông tin nhân viên</Modal.Title>
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
              onChange={(e) => setGender(e.target.value)}
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
              selected={dateOfBirth ? new Date(dateOfBirth) : null}
              onChange={(date) =>
                setDateOfBirth(date ? date.toISOString() : null)
              }
              dateFormat="dd-MM-yyyy"
              className="form-control"
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleUpdateEmployeeInfo}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeInfo;
