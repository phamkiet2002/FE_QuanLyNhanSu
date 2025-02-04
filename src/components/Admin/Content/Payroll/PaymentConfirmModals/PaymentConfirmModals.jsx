import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./PaymentConfirmModals.scss";
const PaymentConfirmModals = (props) => {
  const {
    showPaymentModal,
    setShowPaymentModal,
    showCancelModal,
    setShowCancelModal,
    paymentPayroll,
    cancelReason,
    setCancelReason,
    handleConfirmPayment,
    handleCancelPayment,
  } = props;
  return (
    <>
      {/* Payment Confirmation Modal */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100">Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-warning">
            {paymentPayroll && (
              <p className="text-center mb-0">
                Xác nhận thanh toán{" "}
                <strong>
                  {paymentPayroll.salaryNet?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>{" "}
                ?
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmPayment}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Payment Modal */}
      <Modal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hủy thanh toán lương</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Lý do hủy thanh toán <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Nhập lý do hủy thanh toán..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCancelPayment}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentConfirmModals;
