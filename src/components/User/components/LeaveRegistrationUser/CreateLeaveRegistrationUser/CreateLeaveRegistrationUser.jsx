import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createLeaveRegistrationDayOff,
  createLeaveRegistrationHalfDayOff,
} from "../../../../../services/LeaveRegistration";
import { getAllLeaveDate } from "../../../../../services/LeaveDateService";
import { Form, Button, Modal } from "react-bootstrap";
import "./CreateLeaveRegistrationUserStyle.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateLeaveRegistrationUser = (props) => {
  const { showCreate, setShowCreate, fetchListLeaveRegistration } = props;
  const [typeOfLeave, setTypeOfLeave] = useState("Nghingay");
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDateId, setLeaveDateId] = useState("");
  const [halfDayOff, setHalfDayOff] = useState(0);
  const [leaveDate, setLeaveDate] = useState([]);

  useEffect(() => {
    const fetchLeaveDates = async () => {
      try {
        const res = await getAllLeaveDate("", 1, 100);
        setLeaveDate(res.value.items);
      } catch (error) {
        console.error("Error fetching leave dates:", error);
      }
    };

    fetchLeaveDates();
  }, []);

  const resetForm = () => {
    setTypeOfLeave("Nghingay");
    setStartDate(new Date().toISOString());
    setEndDate(new Date().toISOString());
    setLeaveReason("");
    setLeaveDateId("");
    setHalfDayOff("Sang");
  };

  const handleClose = () => {
    setShowCreate(false);
    resetForm();
  };

  const validateForm = () => {
    let valid = true;
    const today = new Date();
    const startDt = new Date(startDate);
    const endDt = new Date(endDate);

    if (leaveReason === "" || leaveDateId === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      valid = false;
    }

    // Validate date fields
    if (typeOfLeave === "Nghingay") {
      if (!startDate || !endDate) {
        toast.error("Vui lòng chọn ngày nghỉ!");
        valid = false;
      } else if (startDt > endDt) {
        toast.error("Ngày bắt đầu không thể sau ngày kết thúc!");
        valid = false;
      }
    } else {
      // Nghibuoi
      if (!startDate) {
        toast.error("Vui lòng chọn ngày nghỉ!");
        valid = false;
      }
    }

    return valid;
  };

  const handleCreateLeaveRegistration = async () => {
    if (validateForm()) {
      const formattedDate = new Date(startDate);
      formattedDate.setHours(0, 0, 0, 0);

      let leaveRegistration;

      if (typeOfLeave === "Nghingay") {
        leaveRegistration = {
          startDate: formattedDate.toISOString(),
          endDate: new Date(endDate).toISOString(),
          leaveReason,
          leaveDateId
        };
      } else {
        leaveRegistration = {
          command: "CreateLeaveRegistrationNghiBuoi",
          typeOfLeave,
          dayOff: formattedDate.toISOString(),
          halfDayoff: Number(halfDayOff), // Convert to number
          leaveReason,
          leaveDateId
        };
      }

      try {
        let res;
        if (typeOfLeave === "Nghingay") {
          res = await createLeaveRegistrationDayOff(leaveRegistration);
        } else {
          res = await createLeaveRegistrationHalfDayOff(leaveRegistration);
        }

        if (res.isSuccess) {
          handleClose();
          fetchListLeaveRegistration();
          toast.success("Tạo phiếu đăng ký nghỉ thành công.");
        } else {
          toast.error(
            res.errors?.[0]?.message || "Lỗi khi tạo phiếu đăng ký nghỉ"
          );
        }
      } catch (error) {
        toast.error("Lỗi khi tạo phiếu đăng ký nghỉ");
      }
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
        <Modal.Title>Tạo phiếu đăng ký nghỉ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">
              Loại nghỉ phép <span className="valid">*</span>
            </label>
            <Form.Select
              value={typeOfLeave}
              onChange={(e) => setTypeOfLeave(e.target.value)}
            >
              <option value="Nghingay">Nghỉ ngày</option>
              <option value="Nghibuoi">Nghỉ buổi</option>
            </Form.Select>
          </div>

          <div className="col-md-12">
            <label className="form-label">
              Tên ngày nghỉ <span className="valid">*</span>
            </label>
            <Form.Select
              value={leaveDateId}
              onChange={(e) => setLeaveDateId(e.target.value)}
            >
              <option value="" disabled>
                Chọn tên ngày nghỉ
              </option>
              {leaveDate.map((leaveDate) => (
                <option key={leaveDate.id} value={leaveDate.id}>
                  {leaveDate.name}
                </option>
              ))}
            </Form.Select>
          </div>

          {typeOfLeave === "Nghingay" && (
            <>
              <div className="col-md-6">
                <label className="form-label">
                  Ngày bắt đầu <span className="valid">*</span>
                </label>
                <DatePicker
                  selected={new Date(startDate)}
                  onChange={(date) => setStartDate(date.toISOString())}
                  dateFormat="dd-MM-yyyy"
                  className="form-control custom-datepicker"
                  placeholderText="Chọn ngày"
                  showPopperArrow={false}
                  popperPlacement="bottom-start"
                  calendarClassName="custom-calendar"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Ngày kết thúc <span className="valid">*</span>
                </label>
                <DatePicker
                  selected={new Date(endDate)}
                  onChange={(date) => setEndDate(date.toISOString())}
                  dateFormat="dd-MM-yyyy"
                  className="form-control custom-datepicker"
                  placeholderText="Chọn ngày"
                  showPopperArrow={false}
                  popperPlacement="bottom-start"
                  calendarClassName="custom-calendar"
                />
              </div>
            </>
          )}

          {typeOfLeave === "Nghibuoi" && (
            <>
              <div className="col-md-6">
                <label className="form-label">
                  Ngày nghỉ <span className="valid">*</span>
                </label>
                <DatePicker
                  selected={new Date(startDate)}
                  onChange={(date) => setStartDate(date.toISOString())}
                  dateFormat="dd-MM-yyyy"
                  className="form-control custom-datepicker"
                  placeholderText="Chọn ngày"
                  showPopperArrow={false}
                  popperPlacement="bottom-start"
                  calendarClassName="custom-calendar"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Buổi nghỉ <span className="valid">*</span>
                </label>
                <Form.Select
                  value={halfDayOff}
                  onChange={(e) => setHalfDayOff(e.target.value)}
                >
                  <option value={0}>Buổi sáng</option>
                  <option value={1}>Buổi chiều</option>
                </Form.Select>
              </div>
            </>
          )}

          <div className="col-md-12">
            <label className="form-label">
              Lý do xin nghỉ <span className="valid">*</span>
            </label>
            <textarea
              className="form-control"
              placeholder="Nhập lý do xin nghỉ"
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              rows="3"
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Bỏ qua
        </Button>
        <Button variant="primary" onClick={handleCreateLeaveRegistration}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateLeaveRegistrationUser;
