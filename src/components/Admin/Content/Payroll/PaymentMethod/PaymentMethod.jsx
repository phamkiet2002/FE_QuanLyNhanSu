import React from "react";
import { Modal, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { FaQrcode, FaMoneyBillWave } from "react-icons/fa";
import "./PaymentMethod.scss";
const PaymentMethod = (props) => {
  const { showVietQRModal, setShowVietQRModal, qrData, handleVietQRConfirm } =
    props;
  return (
    <Modal
      show={showVietQRModal}
      onHide={() => setShowVietQRModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="text-primary">
          <i className="fas fa-money-bill-wave me-2"></i>
          Thanh toán lương
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Tabs defaultActiveKey="qr" id="payment-tabs" className="mb-3">
          <Tab
            eventKey="qr"
            title={
              <span>
                <FaQrcode className="me-2" />
                Thanh toán QR
              </span>
            }
          >
            {qrData && (
              <Row className="align-items-center">
                <Col md={7} className="border-end">
                  <div className="payment-info">
                    <div className="mb-4">
                      <h5 className="text-primary mb-3">
                        Thông tin chuyển khoản
                      </h5>
                      <div className="info-item mb-3">
                        <label className="text-muted mb-1">Ngân hàng:</label>
                        <p className="h6">{qrData.bankInfo.bankName}</p>
                      </div>
                      <div className="info-item mb-3">
                        <label className="text-muted mb-1">Số tài khoản:</label>
                        <p className="h6">{qrData.bankInfo.accountNo}</p>
                      </div>
                      <div className="info-item mb-3">
                        <label className="text-muted mb-1">
                          Tên tài khoản:
                        </label>
                        <p className="h6">{qrData.bankInfo.accountName}</p>
                      </div>
                      <div className="info-item mb-3">
                        <label className="text-muted mb-1">Số tiền:</label>
                        <p className="h5 text-danger">
                          {qrData.bankInfo.amount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="info-item">
                        <label className="text-muted mb-1">Nội dung:</label>
                        <p className="h6">{qrData.bankInfo.description}</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={5} className="text-center">
                  <div className="qr-container p-3">
                    <div className="qr-wrapper mb-3">
                      <img
                        src={qrData.qrCode}
                        alt="VietQR Code"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxWidth: "240px" }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-muted mb-1">
                        Quét mã QR để thanh toán
                      </p>
                      <small className="text-muted">
                        Sử dụng ứng dụng ngân hàng hỗ trợ VietQR
                      </small>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Tab>

          <Tab
            eventKey="cash"
            title={
              <span>
                <FaMoneyBillWave className="me-2" />
                Tiền mặt
              </span>
            }
          >
            <div className="cash-payment p-4">
              <div className="text-center mb-4">
                <FaMoneyBillWave size={48} className="text-success mb-3" />
                <h4>Thanh toán tiền mặt</h4>
              </div>
              {qrData && (
                <div className="payment-details">
                  <div className="info-item mb-3">
                    <label className="text-muted mb-1">Người nhận:</label>
                    <p className="h6">{qrData.bankInfo.accountName}</p>
                  </div>
                  <div className="info-item mb-3">
                    <label className="text-muted mb-1">Số tiền cần trả:</label>
                    <p className="h5 text-danger">
                      {qrData.bankInfo.amount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="info-item">
                    <label className="text-muted mb-1">Ghi chú:</label>
                    <p className="h6">{qrData.bankInfo.description}</p>
                  </div>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className="border-top">
        <Button
          variant="outline-secondary"
          onClick={() => setShowVietQRModal(false)}
        >
          Hủy bỏ
        </Button>
        <Button variant="primary" onClick={handleVietQRConfirm}>
          Thanh toán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentMethod;
