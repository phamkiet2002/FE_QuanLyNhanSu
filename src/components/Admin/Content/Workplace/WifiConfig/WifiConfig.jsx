import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaWifi, FaSpinner } from "react-icons/fa";
import {
  getAllWifiConfig,
  createWifiConfig,
} from "../../../../../services/WifiConfigService";
import "./WifiConfigStyle.scss";

const WifiConfig = (props) => {
  const { show, handleClose, selectedWorkplace } = props;
  const [ssid, setSsid] = useState("");
  const [bssid, setBssid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetForm = () => {
    setSsid("");
    setBssid("");
  };

  const handleGetWifiInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getAllWifiConfig();
      if (response.isSuccess) {
        setSsid(response.value.ssid);
        setBssid(response.value.bssid);
      } else {
        toast.error("Không thể lấy thông tin WiFi");
      }
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin WiFi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!ssid || !bssid || !selectedWorkplace?.id) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const wifiConfig = {
        ssid,
        bssid,
        workPlaceId: selectedWorkplace.id,
      };

      const response = await createWifiConfig(wifiConfig);
      if (response.isSuccess) {
        toast.success("Cấu hình WiFi thành công");
        handleClose();
        resetForm();
      } else {
        toast.error("Lỗi khi cấu hình WiFi");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu cấu hình WiFi");
    }
  };

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="wifi-config"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cấu hình WiFi - {selectedWorkplace?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Button
            variant="info"
            onClick={handleGetWifiInfo}
            className={`get-wifi-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="icon-spin" style={{ marginRight: "8px" }} />
            ) : (
              <FaWifi style={{ marginRight: "8px" }} />
            )}
            {isLoading
              ? "Đang lấy thông tin..."
              : "Lấy thông tin WiFi hiện tại"}
          </Button>
          <Form.Group className="mb-3">
            <Form.Label>
              Tên Wifi <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="Nhập SSID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Địa chỉ MAC <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={bssid}
              onChange={(e) => setBssid(e.target.value)}
              placeholder="Nhập BSSID"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WifiConfig;
