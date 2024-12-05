import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaUmbrellaBeach,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaRegCheckSquare,
} from "react-icons/fa";
import Payroll from "../Payroll/Payroll";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePageStyle.scss";
import { checkIn, checkOut } from "../../../../services/AttendanceService";
import { toast } from "react-toastify";
import LeaveRegistrationUser from "../LeaveRegistrationUser/LeaveRegistrationUser";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOut, setIsLoadingOut] = useState(false);
  const [workTime, setWorkTime] = useState(0);
  const [workTimer, setWorkTimer] = useState("");
  const [attendance, setAttendance] = useState("");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCheckIn = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      const token = localStorage.getItem("token");

      if (!employeeId || !token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }

      setIsLoading(true);

      const checkinData = {
        employeeId: employeeId,
      };

      const res = await checkIn(checkinData);

      if (res.isSuccess) {
        toast.success("Check-in thành công!");
        const timer = setInterval(() => {
          setWorkTime((prev) => prev + 1);
        }, 1000);
        setWorkTimer(timer);
      } else {
        toast.error(res.detail || "Check-in thất bại!");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      toast.error("Đã xảy ra lỗi khi check-in!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      const token = localStorage.getItem("token");

      if (!employeeId || !token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }

      setIsLoadingOut(true);

      const checkoutData = {
        employeeId: employeeId,
      };

      const res = await checkOut(checkoutData);

      if (res.isSuccess) {
        toast.success("Check-out thành công!");
        if (workTimer) {
          clearInterval(workTimer);
          setWorkTimer(null);
        }
        setWorkTime(0);
      } else {
        toast.error(res.detail || "Check-out thất bại!");
      }
    } catch (error) {
      console.error("Check-out error:", error);
      toast.error("Đã xảy ra lỗi khi check-out!");
    } finally {
      setIsLoadingOut(false);
    }
  };

  return (
    <Container fluid className="homepage-container">
      {activeTab === "home" && (
        <>
          <Row className="homepage-card justify-content-center">
            <Col md={12}>
              <Card className="card-backround ">
                <Card.Body>
                  <Card.Title>Chào buổi trưa</Card.Title>
                  <Card.Text>
                    <h2 className="">{formatTime(workTime)}</h2>
                    <p className="">0 Nhân viên được xếp lịch</p>
                    <p className="">0 Nhân viên đã chấm công</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="homepage-attendance justify-content-center button-attendance">
            <Col md={8} className="d-flex justify-content-around">
              <Button
                variant="primary"
                className="button-checkin-custom d-flex"
                disabled={isLoading}
                onClick={handleCheckIn}
              >
                <div>
                  <FaRegCheckSquare />
                </div>
                <div className="text-start">
                  <span className="text-size">
                    {isLoading ? "Đang xử lý..." : "Check-in"}
                  </span>
                  <br />
                  <span className="text-under-checkin">
                    để bắt đầu công việc
                  </span>
                </div>
              </Button>

              <Button
                variant="warning"
                className="button-checkout-custom d-flex "
                disabled={isLoadingOut}
                onClick={handleCheckOut}
              >
                <div>
                  <FaRegCheckSquare />
                </div>
                <div className="text-start">
                  <span className="text-size">Check-out</span> <br />
                  <span className="text-under-checkout">
                    để hoàn thành công việc
                  </span>
                </div>
              </Button>
            </Col>
          </Row>

          <Row className="homepage-menu justify-content-center button-menu">
            <Col md={12} className="d-flex justify-content-around">
              <Button
                className="button-leaveregistration-custom"
                onClick={() => handleTabChange("leaveregistration")}
              >
                <FaUmbrellaBeach
                  style={{ marginRight: "8px", color: "#28a745" }}
                />
                Đăng ký nghỉ
              </Button>

              <Button
                className="button-salarytable-custom"
                onClick={() => handleTabChange("payroll")}
              >
                <FaMoneyCheckAlt
                  style={{ marginRight: "8px", color: "#ffc107" }}
                />
                Bảng lương
              </Button>

              <Button className="button-attendancetable-custom">
                <FaClipboardList
                  style={{ marginRight: "8px", color: "#17a2b8" }}
                />
                Bảng chấm công
              </Button>
            </Col>
          </Row>
        </>
      )}
      {activeTab === "payroll" && (
        <Payroll onBack={() => handleTabChange("home")} />
      )}
      {activeTab === "leaveregistration" && (
        <LeaveRegistrationUser onBack={() => handleTabChange("home")} />
      )}
    </Container>
  );
};

export default HomePage;
