import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import Attendance from "../Attendance/Attendance";
import { getEmployeeById } from "../../../../services/EmployeeService";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingOut, setIsLoadingOut] = useState(false);
  const [workTimer, setWorkTimer] = useState(null);
  const [workTime, setWorkTime] = useState(() => {
    const savedWorkTime = sessionStorage.getItem("workTime");
    const lastCheckInTime = sessionStorage.getItem("lastCheckInTime");

    if (savedWorkTime && lastCheckInTime) {
      // Tính toán thời gian đã trôi qua kể từ lần check-in cuối
      const timeDiff = Math.floor(
        (Date.now() - parseInt(lastCheckInTime)) / 1000
      );
      return parseInt(savedWorkTime) + timeDiff;
    }
    return 0;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const lastCheckInTime = sessionStorage.getItem("lastCheckInTime");
    let timer;

    if (lastCheckInTime) {
      timer = setInterval(() => {
        setWorkTime((prevWorkTime) => prevWorkTime + 1);
      }, 1000);
      setWorkTimer(timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

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
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }

      setIsLoading(true);

      const checkinData = {};

      const res = await checkIn(checkinData);

      if (res.isSuccess) {
        toast.success("Check-in thành công!");
        sessionStorage.setItem("lastCheckInTime", Date.now().toString());
        sessionStorage.setItem("workTime", "0");

        const timer = setInterval(() => {
          setWorkTime((prevWorkTime) => {
            const newWorkTime = prevWorkTime + 1;
            sessionStorage.setItem("workTime", newWorkTime.toString());
            return newWorkTime;
          });
        }, 1000);
        setWorkTimer(timer);
      } else {
        toast.error(res.detail || "Check-in thất bại!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Đã xảy ra lỗi khi check-in!";
      toast.warning(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      const employeeId = sessionStorage.getItem("employeeId");
      const token = sessionStorage.getItem("token");

      if (!employeeId || !token) {
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }

      setIsLoadingOut(true);

      const checkoutData = {};
      const res = await checkOut(checkoutData);
      if (res.isSuccess) {
        sessionStorage.removeItem("workTime");
        sessionStorage.removeItem("lastCheckInTime");
        setWorkTime(0);
        if (workTimer) {
          clearInterval(workTimer);
          setWorkTimer(null);
        }
        toast.success("Check-out thành công!");
      } else {
        if (res.status === 500) {
          if (res.detail === "bạn chưa checkIn.") {
            toast.warning("Bạn chưa check-in!");
          } else if (res.detail === "bạn đã checkOut rồi.") {
            toast.warning("Bạn đã checkout rồi!");
          } else {
            toast.error(res.detail || "Check-out thất bại!");
          }
        }
      }
    } catch (error) {
      if (error.response?.data) {
        const { status, detail } = error.response.data;
        if (status === 500) {
          if (detail === "bạn chưa checkIn.") {
            toast.warning("Bạn chưa check-in!");
          } else if (detail === "bạn đã checkOut rồi.") {
            toast.warning("Bạn đã checkout rồi!");
          } else {
            toast.error(detail || "Đã xảy ra lỗi khi check-out!");
          }
        }
      } else {
        toast.error("Đã xảy ra lỗi khi check-out!");
      }
    } finally {
      setIsLoadingOut(false);
    }
  };

  const handleCheckOutClick = async () => {
    try {
      const workShedule = await getEmployeeById();
      let isBeforeEndTime = false;

      if (workShedule?.value?.employeeDepartments?.length > 0) {
        const endTimes = workShedule.value.employeeDepartments
          .map((dept) => dept.department?.workShedule?.endTime)
          .filter((time) => time);

        const currentTime = new Date();

        for (const endTimeString of endTimes) {
          const [hours, minutes, seconds] = endTimeString.split(":");
          const endTime = new Date();
          endTime.setHours(
            parseInt(hours, 10),
            parseInt(minutes, 10),
            parseInt(seconds, 10),
            0
          );

          if (currentTime < endTime) {
            isBeforeEndTime = true;
            break;
          }
        }
      }
      if (isBeforeEndTime) {
        setShowModal(true); // Show confirmation modal for early checkout
      } else {
        await handleCheckOut(); // Direct checkout after work hours
      }
    } catch (error) {
      console.error("Error checking work schedule:", error);
      toast.error("Có lỗi xảy ra khi kiểm tra giờ làm việc");
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return "Chào buổi sáng";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Chào buổi chiều";
    } else {
      return "Chào buổi tối";
    }
  };

  return (
    <Container fluid className="homepage-container">
      {activeTab === "home" && (
        <>
          <Row className="homepage-card justify-content-center">
            <Col md={12}>
              <Card className="card-backround">
                <Card.Body>
                  <Card.Title>{getGreeting()}</Card.Title>
                  <Card.Text>
                    <h2 className="">{formatTime(workTime)}</h2>
                    {/* <p className="">0 Nhân viên được xếp lịch</p>
                    <p className="">0 Nhân viên đã chấm công</p> */}
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
                className="button-checkout-custom d-flex align-items-center justify-content-center"
                disabled={isLoadingOut}
                onClick={handleCheckOutClick}
              >
                <div>
                  <FaRegCheckSquare />
                </div>
                <div className="text-start">
                  <span className="text-size">
                    {isLoadingOut ? "Đang xử lý..." : "Check-out"}
                  </span>
                  <br />
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
                onClick={() => navigate("/leave-registration")}
              >
                <FaUmbrellaBeach
                  style={{ marginRight: "8px", color: "#28a745" }}
                />
                Đăng ký nghỉ
              </Button>

              <Button
                className="button-salarytable-custom"
                onClick={() => navigate("/pay-roll")}
              >
                <FaMoneyCheckAlt
                  style={{ marginRight: "8px", color: "#ffc107" }}
                />
                Bảng lương
              </Button>

              <Button
                className="button-attendancetable-custom"
                onClick={() => navigate("/attendance")}
              >
                <FaClipboardList
                  style={{ marginRight: "8px", color: "#17a2b8" }}
                />
                Bảng chấm công
              </Button>
            </Col>
          </Row>
        </>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn Checkout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              handleCheckOut();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
