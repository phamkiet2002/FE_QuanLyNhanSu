import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllEmployee,
  getEmployeeByMaNv,
} from "../../../../../services/EmployeeService";
import { createContract } from "../../../../../services/ContractService";
import { Form, Button, Modal } from "react-bootstrap";
import "./CreateContractStyle.scss";
import DatePicker from "react-datepicker";

const CreateContract = (props) => {
  const { showCreate, setShowCreate, fetchListContract } = props;

  const [contractNumber, setContractNumber] = useState("");
  const [signDate, setSignDate] = useState(new Date().toISOString());
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString());
  const [expirationDate, setExpirationDate] = useState(
    new Date().toISOString()
  );

  const [employeeId, setEmployeeId] = useState("");
  const [maNv, setMaNv] = useState("");

  const resetForm = () => {
    setContractNumber("");
    setSignDate("");
    setEffectiveDate("");
    setExpirationDate("");
    setEmployeeId("");
    setMaNv("");
  };

  const handleClose = () => {
    setShowCreate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    if (
      contractNumber === "" ||
      signDate === "" ||
      effectiveDate === "" ||
      expirationDate === "" ||
      maNv === ""
    ) {
      valid = false;
    }
    return valid;
  };

  const fetchEmployeeByMaNv = async (maNv) => {
    try {
      let res = await getEmployeeByMaNv(maNv);
      if (res.isSuccess) {
        setEmployeeId(res.value.id);
        return res.value.id;
      } else {
        setEmployeeId("");
        toast.error("Không tìm thấy nhân viên với mã này.");
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Lỗi khi tìm kiếm nhân viên.");
      return false;
    }
  };

  const handleCreateContract = async () => {
    if (!validateForm()) {
      toast.error("Vui lòng nhập đầy đủ các trường.");
      return;
    }
    const employeeId = await fetchEmployeeByMaNv(maNv);
    if (!employeeId) return;

    const contract = {
      contracNumber: contractNumber,
      signDate,
      effectiveDate,
      expirationDate,
      employeeId,
    };

    try {
      let res = await createContract(contract);
      console.log(contract);
      if (res.isSuccess) {
        handleClose();
        resetForm();
        await fetchListContract("", "", 1, 10);
        toast.success("Thêm hợp đồng thành công.");
      } else {
        toast.error("Lỗi khi thêm hợp đồng.");
      }
    } catch (error) {
      console.error("Error creating contract:", error);
      toast.error("Lỗi khi thêm hợp đồng.");
    }
  };

  return (
    <Modal
      show={showCreate}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      className="modal-create"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới Hợp đồng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">
              Số hợp đồng
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
              placeholder="Nhập số hợp đồng"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Ngày ký
              <span className="valid">*</span>
            </label>
            <DatePicker
              selected={signDate ? new Date(signDate) : null}
              onChange={(date) => setSignDate(date ? date.toISOString() : null)}
              dateFormat="dd-MM-yyyy"
              className="form-control"
              placeholderText="Chọn ngày"
              wrapperClassName="w-100"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Ngày hiệu lực
              <span className="valid">*</span>
            </label>
            <DatePicker
              selected={effectiveDate ? new Date(effectiveDate) : null}
              onChange={(date) =>
                setEffectiveDate(date ? date.toISOString() : null)
              }
              dateFormat="dd-MM-yyyy"
              className="form-control"
              placeholderText="Chọn ngày"
              wrapperClassName="w-100"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Ngày hết hạn
              <span className="valid">*</span>
            </label>
            <DatePicker
              selected={expirationDate ? new Date(expirationDate) : null}
              onChange={(date) =>
                setExpirationDate(date ? date.toISOString() : null)
              }
              dateFormat="dd-MM-yyyy"
              className="form-control"
              placeholderText="Chọn ngày"
              wrapperClassName="w-100"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Mã nhân viên
              <span className="valid">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={maNv}
              onChange={(e) => setMaNv(e.target.value)}
              placeholder="Nhập mã nhân viên"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={() => handleCreateContract()}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateContract;
