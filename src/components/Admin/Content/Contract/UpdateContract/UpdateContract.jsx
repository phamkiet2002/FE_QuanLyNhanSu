import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllEmployee,
  getEmployeeByMaNv,
} from "../../../../../services/EmployeeService";
import { updateContract } from "../../../../../services/ContractService";
import { Form, Button, Modal } from "react-bootstrap";
import "./UpdateContractStyle.scss";
import DatePicker from "react-datepicker";

const UpdateContract = (props) => {
  const { showUpdate, setShowUpdate, fetchListContract, dataUpdate } = props;

  const [contractNumber, setContractNumber] = useState("");
  const [signDate, setSignDate] = useState(new Date().toISOString());
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString());
  const [expirationDate, setExpirationDate] = useState(
    new Date().toISOString()
  );
  const [employeeId, setEmployeeId] = useState("");
  const [maNv, setMaNv] = useState("");

  useEffect(() => {
    if (showUpdate && dataUpdate) {
      setContractNumber(dataUpdate.contracNumber || "");
      setSignDate(dataUpdate.signDate || new Date().toISOString());
      setEffectiveDate(dataUpdate.effectiveDate || new Date().toISOString());
      setExpirationDate(dataUpdate.expirationDate || new Date().toISOString());
      setMaNv(dataUpdate.employee?.maNv || "");
      setEmployeeId(dataUpdate.employee?.id || "");
    }
  }, [dataUpdate, showUpdate]);

  const resetForm = () => {
    setContractNumber("");
    setSignDate(new Date().toISOString());
    setEffectiveDate(new Date().toISOString());
    setExpirationDate(new Date().toISOString());
    setEmployeeId("");
    setMaNv("");
  };

  const handleClose = () => {
    setShowUpdate(false);
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
        toast.error("Không tìm thấy nhân viên với mã này.");
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Lỗi khi tìm kiếm nhân viên.");
      return null;
    }
  };

  const handleUpdateContract = async () => {
    if (!validateForm()) return;

    try {
      // Đợi lấy employeeId trước khi tạo contract object
      const fetchedEmployeeId = await fetchEmployeeByMaNv(maNv);
      if (!fetchedEmployeeId) return;

      const contract = {
        contracNumber: contractNumber,
        signDate,
        effectiveDate,
        expirationDate,
        employeeId: fetchedEmployeeId, // Sử dụng employeeId mới fetch được
      };

      const res = await updateContract(dataUpdate.id, contract);

      if (res.isSuccess) {
        toast.success("Sửa hợp đồng thành công.");
        handleClose();
        await fetchListContract("", "", 1, 10);
      } else {
        toast.error(
          "Lỗi khi sửa hợp đồng: " + (res.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error updating contract:", error);
      toast.error(
        "Lỗi khi sửa hợp đồng: " + (error.message || "Unknown error")
      );
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
        <Modal.Title>Cập nhật hợp đồng</Modal.Title>
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
              selected={signDate ? new Date(signDate) : new Date()}
              onChange={(date) => setSignDate(date.toISOString())}
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
              selected={effectiveDate ? new Date(effectiveDate) : new Date()}
              onChange={(date) => setEffectiveDate(date.toISOString())}
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
              selected={expirationDate ? new Date(expirationDate) : new Date()}
              onChange={(date) => setExpirationDate(date.toISOString())}
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
        <Button variant="primary" onClick={handleUpdateContract}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateContract;
