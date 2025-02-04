import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Col,
  Row,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Icon from "@mdi/react";
import QRCode from "qrcode";
import { mdiRepeat, mdiBookRemoveOutline } from "@mdi/js";
import { FaFileExcel, FaMoneyBill } from "react-icons/fa";
import Pagination from "../../../Common/Pagination/Pagination";
import Fillter from "./Fillter/Fillter";
import MonthDatepicker from "../../../Common/MonthDatepicker/MonthDatepicker";
import { useAuth } from "../../../context/AuthContext";
import { getPayroll } from "../../../../services/EmployeeService";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import { getPayrollReport } from "../../../../services/ReportService";
import { caculatePayroll, payMent } from "../../../../services/PayrollService";
import ListPayroll from "./ListPayroll/ListPayroll";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import PaymentConfirmModals from "./PaymentConfirmModals/PaymentConfirmModals";
import { getBankCode } from "../../../../Utils/bankCode";
import { VIETQR_IMAGE_BASE_URL } from "../../../../Utils/config";
import "./PayrollStyle.scss";

const Payroll = () => {
  const { user } = useAuth();
  const roleAccess = {
    view: ["ADMIN", "HR_MANAGER"],
    calculate: ["ADMIN", "HR_MANAGER"],
    pay: ["ADMIN", "HR_MANAGER"],
  };
  const hasPermision = (feature) =>
    user?.roles && roleAccess[feature]?.some((r) => user.roles.includes(r));

  const [payrollData, setPayrollData] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");
  const [filterText, setFilterText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isCalculating, setIsCalculating] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPayroll, setPaymentPayroll] = useState(null);
  const [showVietQRModal, setShowVietQRModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPayrollData = async () => {
    const month = selectedMonth.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const res = await getPayroll(
      filterText,
      selectedWorkPlace,
      month,
      pageIndex,
      pageSize
    );
    if (res.isSuccess) {
      setPayrollData(res.value.items);
      setTotalCount(res.value.totalCount);
      setPageSize(res.value.pageSize);
    }
  };

  const fetchWorkPlace = async () => {
    const res = await getAllWorkPlace("", 1, 100);
    setWorkPlaces(res.value.items);
  };

  useEffect(() => {
    if (hasPermision("view")) {
      fetchPayrollData();
    }
  }, [selectedMonth, pageIndex, pageSize, hasPermision("view")]);

  useEffect(() => {
    fetchWorkPlace();
  }, []);

  useEffect(() => {
    if (paymentPayroll) {
      handlePaymentWithVietQR();
    }
  }, [paymentPayroll]);

  const handleFilter = () => {
    setPageIndex(1);
    fetchPayrollData();
  };

  const handleClear = () => {
    setFilterText("");
    setSelectedWorkPlace("");
    setSelectedMonth(new Date());
    fetchPayrollData();
  };
  // Add handleVietQRConfirm function
  const handleVietQRConfirm = () => {
    setShowVietQRModal(true);
    setShowPaymentModal(true);
  };

  const handleCaculatePayroll = async () => {
    if (!hasPermision("calculate")) {
      toast.error("Bạn không có quyền tính lại lương.");
      return;
    }
    setIsCalculating(true);
    const res = await caculatePayroll();
    if (res.isSuccess) {
      toast.success("Tính lại lương thành công");
      fetchPayrollData();
    } else {
      toast.error("Lỗi khi tính lại lương");
    }
    setIsCalculating(false);
  };

  const handleCancelPayment = async () => {
    if (!cancelReason.trim()) {
      toast.error("Vui lòng nhập lý do hủy thanh toán");
      return;
    }

    const res = await payMent({
      id: selectedPayroll,
      payRollStatus: 1,
      reasonNote: cancelReason,
    });
    if (res.isSuccess) {
      toast.success("Hủy thanh toán thành công");
      fetchPayrollData();
    } else {
      toast.error("Lỗi khi hủy thanh toán");
    }
    setShowCancelModal(false);
    setCancelReason("");
  };

  const handleExportExcel = async () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;
    const res = await getPayrollReport(
      selectedWorkPlace,
      `${month}/${year}`,
      pageIndex,
      pageSize
    );
    const blob = new Blob([res], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payroll_Report_${month}_${year}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleConfirmPayment = async () => {
    if (!hasPermision("pay") || !paymentPayroll) {
      toast.error("Bạn không có quyền hoặc không thể thực hiện.");
      return;
    }
    const res = await payMent({
      id: paymentPayroll.id,
      payRollStatus: 0,
      reasonNote: "",
    });
    if (res.isSuccess) {
      toast.success("Thanh toán lương thành công");
      fetchPayrollData();
    } else {
      toast.error("Lỗi khi thanh toán");
    }
    setShowPaymentModal(false);
    setPaymentPayroll(null);
    setShowVietQRModal(false);
  };

  //kiem tra quyen thanh toan
  const handlePayment = async (payrollId, currentStatus, netSalary) => {
    if (!hasPermision("pay")) {
      toast.error("Bạn không có quyền thanh toán lương.");
      return;
    }

    if (currentStatus === "PAID") {
      setSelectedPayroll(payrollId);
      setShowCancelModal(true);
    } else {
      await setPaymentPayroll({ id: payrollId, salaryNet: netSalary });
    }
  };

  const generateVietQR = async (paymentData, employeeData) => {
    try {
      const bankCode = getBankCode(employeeData.bankName);
      if (!bankCode) {
        toast.error("Mã ngân hàng không hợp lệ");
        return null;
      }
      const qrImageUrl = `${VIETQR_IMAGE_BASE_URL}/${employeeData.bankName}-${employeeData.bankAccountNumber}-compact2.png`;

      const urlWithParams = `${qrImageUrl}?amount=${paymentData.salaryNet?.toFixed(
        0
      )}&accountName=${encodeURIComponent(
        employeeData.name.toUpperCase()
      )}&addInfo=${encodeURIComponent(
        `Thanh toán lương tháng ${
          selectedMonth.getMonth() + 1
        }/${selectedMonth.getFullYear()} cho ${employeeData.name}`
      )}`;
      return {
        qrCode: urlWithParams,
        bankInfo: {
          accountNo: employeeData.bankAccountNumber,
          accountName: employeeData.name,
          bankName: employeeData.bankName,
          amount: paymentData.salaryNet,
          description: `Thanh toán lương tháng ${
            selectedMonth.getMonth() + 1
          }/${selectedMonth.getFullYear()} cho ${employeeData.name}`,
        },
      };
    } catch (error) {
      toast.error("Lỗi khi tạo mã QR");
      return null;
    }
  };

  const handlePaymentWithVietQR = async () => {
    try {
      if (!paymentPayroll?.id) {
        toast.error("Không tìm thấy thông tin thanh toán");
        return;
      }

      const employee = payrollData.find((emp) =>
        emp.payRolls?.some((pr) => pr.id === paymentPayroll.id)
      );

      if (!employee) {
        toast.error("Không tìm thấy thông tin nhân viên");
        return;
      }

      // Validate bank information
      if (!employee.bankAccountNumber || !employee.bankName) {
        toast.error("Không tìm thấy thông tin ngân hàng của nhân viên");
        return;
      }

      // Generate QR code
      const qrData = await generateVietQR(paymentPayroll, employee);
      if (qrData) {
        setQrData(qrData);
        setShowVietQRModal(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra khi thanh toán");
    }
  };

  return (
    <Container className="payroll-container mt-4">
      <div className="wrap_fillter">
        <Row className="mb-3 row-tool align-items-center">
          <Col xs={9} md="auto">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Nhập tên nhân viên"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md="auto">
            <Fillter
              workPlaces={workPlaces}
              selectedWorkPlace={selectedWorkPlace}
              setSelectedWorkPlace={setSelectedWorkPlace}
            />
          </Col>
          <Col xs={12} md="auto">
            <MonthDatepicker
              selected={selectedMonth}
              onChange={(date) => {
                setSelectedMonth(date);
                setPageIndex(1);
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="form-control"
              placeholderText="Chọn tháng"
            />
          </Col>
          <Col xs={12} md="auto">
            <Button
              variant="primary"
              onClick={handleFilter}
              style={{ marginRight: 5 }}
            >
              Lọc
            </Button>
            <Button variant="outline-secondary" onClick={handleClear}>
              X
            </Button>
          </Col>
        </Row>
      </div>

      <div className="btn_caculate d-flex justify-content-end align-items-center mb-2">
        <Button
          onClick={handleExportExcel}
          className="btn btn-label btn-primary mb-2"
          style={{
            minWidth: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <FaFileExcel
            style={{ marginRight: 8, verticalAlign: "middle", color: "#fff" }}
          />
          Xuất Excel
        </Button>
        {hasPermision("calculate") && (
          <Button
            onClick={handleCaculatePayroll}
            className="btn btn-label btn-primary mb-2 mr-2"
            disabled={isCalculating}
            style={{
              minWidth: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              path={mdiRepeat}
              size={1}
              style={{ marginRight: 8, verticalAlign: "middle", color: "#fff" }}
              className={isCalculating ? "mr-3 spin-animation" : "mr-3"}
            />
            {isCalculating ? "Đang tính..." : "Tính lại lương"}
          </Button>
        )}
      </div>

      <ListPayroll
        payrollData={payrollData}
        hasPermision={hasPermision}
        handlePayment={handlePayment}
      />
      {/* Thanh toán QR hoặc tiền mặt */}
      <PaymentMethod
        showVietQRModal={showVietQRModal}
        setShowVietQRModal={setShowVietQRModal}
        qrData={qrData}
        handleVietQRConfirm={handleVietQRConfirm}
      />

      {/* xác nhân thanh toán */}
      <PaymentConfirmModals
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        showCancelModal={showCancelModal}
        setShowCancelModal={setShowCancelModal}
        paymentPayroll={paymentPayroll}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        handleConfirmPayment={handleConfirmPayment}
        handleCancelPayment={handleCancelPayment}
      />

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        handlePreviousPage={() => setPageIndex((prev) => prev - 1)}
        handleNextPage={() => setPageIndex((prev) => prev + 1)}
      />
    </Container>
  );
};

export default Payroll;
