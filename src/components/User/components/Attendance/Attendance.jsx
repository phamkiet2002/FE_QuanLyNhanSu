import React, { useEffect, useState, useMemo } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./AttendanceStyle.scss";
import { getEmployeeAttendance } from "../../../../services/AttendanceService";
import MonthDatepicker from "../../../Common/MonthDatepicker/MonthDatepicker";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Attendance = () => {
  const [filterText, setFilterText] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const formatTime = (dateString) => {
    if (!dateString || dateString.includes("0001-01-01")) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseTimeToMinutes = (timeString) => {
    if (!timeString || timeString.includes("0001-01-01")) return 0;
    const date = new Date(timeString);
    return date.getHours() * 60 + date.getMinutes();
  };

  const formatLateTime = (minutes) => {
    if (!minutes) return "0p";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h${remainingMinutes}p`;
    }
    return `${remainingMinutes}p`;
  };

  useEffect(() => {
    const startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);

    const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();

    const daysOfWeek = ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"];

    const newDates = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), i + 1);
      return {
        date: currentDate.toLocaleDateString("vi-VN"),
        day: daysOfWeek[currentDate.getDay()],
        fullDate: currentDate,
      };
    });

    setDates(newDates);
    fetchAttendanceData();
  }, [selectedMonth]);

  const handleClear = () => {
    setFilterText("");
  };

  const getBadgeClass = (record) => {
    if (!record) return "";
    if (record.leaveRequest) return "span-leave-request";
    if (record.isAbsent) return "span-absent";
    if (record.isLate || record.isEarlyLeave) return "span-warning";
    if (record.isEdited) return "span-edited";
    if (record.overtimeOutsideWorkHours) return "span-overtime";
    return "span-success";
  };

  const handleDateChange = (date) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
    setSelectedMonth(newDate);
  };

  const filteredAttendanceData = useMemo(() => {
    return attendanceData.filter((employee) =>
      employee.maNv
        ? employee.maNv.toLowerCase().includes(filterText.toLowerCase())
        : false
    );
  }, [attendanceData, filterText]);

  const calculateTotalWorkTime = (attendanceRecords) => {
    return attendanceRecords.reduce((total, record) => {
      if (
        record.checkIn &&
        record.checkOut &&
        !record.checkIn.includes("0001-01-01") &&
        !record.checkOut.includes("0001-01-01")
      ) {
        const checkInTime = new Date(record.checkIn);
        const checkOutTime = new Date(record.checkOut);
        const workTime = (checkOutTime - checkInTime) / (1000 * 60);
        return total + workTime;
      }
      return total;
    }, 0);
  };

  const formatWorkTime = (minutes) => {
    if (minutes <= 0) return "0h 0p";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}p`;
  };

  const findAttendanceRecord = (date, attendance) => {
    return attendance.find((record) => {
      const compareSourceDate =
        record.isAbsent || record.leaveRequest
          ? new Date(record.createdDate)
          : new Date(record.checkIn);

      compareSourceDate.setHours(0, 0, 0, 0);

      const compareDate = new Date(date.fullDate);
      compareDate.setHours(0, 0, 0, 0);

      return compareSourceDate.getTime() === compareDate.getTime();
    });
  };

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await getEmployeeAttendance();
      if (!response.isSuccess) {
        throw new Error(response.error?.message || "Có lỗi xảy ra");
      }

      const employeeData = response.value ? [response.value] : [];
      const formattedData = employeeData.map((employee) => {
        const totalWorkTimeMinutes = parseTimeToMinutes(
          employee.totalTimeAttendance
        );
        const totalLateTimeMinutes = parseTimeToMinutes(
          employee.totalTimeDayLate
        );
        const totalEarlyLeaveTimeMinutes = parseTimeToMinutes(
          employee.totalTimeDayEarlyLeave
        );

        return {
          id: employee.id,
          name: employee.name,
          maNv: employee.maNV,
          attendance: employee.attendances
            ? employee.attendances.map((record) => ({
              date: formatDate(record.checkIn),
              checkIn: record.checkIn,
              checkOut: record.checkOut,
              isLate: record.isLate,
              isEarlyLeave: record.isEarlyLeave,
              isAbsent: record.isAbsent,
              lateTime: record.lateTime,
              earlyLeaveTime: record.earlyLeaveTime,
              leaveRequest: record.leaveRequest,
              createdDate: record.createdDate,
              overtimeOutsideWorkHours: record.overtimeOutsideWorkHours,
            }))
            : [],
        };
      });

      setAttendanceData(formattedData);
      setError(null);
    } catch (err) {
      setError("Có lỗi xảy ra khi tải dữ liệu: " + err.message);
      console.error("Error fetching attendance data:", err);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  return (
    <div className="Attendance container-fluid">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={handleBack}
        />
        <h3 className="mb-0">Bảng chấm công nhân viên</h3>
      </div>
      <Row className="mb-3 row-tool">

        <Col xs={6} md={3}>
          <MonthDatepicker value={selectedMonth} onChange={handleDateChange} />
        </Col>
      </Row>

      <div className="row mt-2 mb-2 attendance-info">
        <div className="color-info ml-3 d-flex align-items-center">
          <p className="mr-3 mb-0 d-flex align-items-center font-size-12">
            <span className="success mr-2 span-success"></span> Đúng giờ
          </p>
          <p className="mr-3 mb-0 d-flex align-items-center font-size-12">
            <span className="warning mr-2 span-warning"></span> Đến muộn hoặc về
            sớm
          </p>
          <p className="mr-3 mb-0 d-flex align-items-center font-size-12">
            <span className="edited mr-2 span-edited"></span> Đã chỉnh sửa
          </p>
          <p className="mb-0 d-flex align-items-center font-size-12">
            <span className="overtime mr-2 span-overtime"></span> Ra ngoài quá
            giờ
          </p>
        </div>
      </div>

      {loading && <div>Đang tải dữ liệu...</div>}
      {error && <div className="text-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive table-timekeeping">
          <div className="table table-bordered b-table scroll-table">
            <thead>
              <tr>
                <th scope="col" rowSpan="2">
                  STT
                </th>
                <th scope="col" rowSpan="2" className="sticky-col">
                  Mã nhân viên
                </th>
                <th scope="col" rowSpan="2" className="sticky-col">
                  Tên nhân viên
                </th>
                {dates.map((date, index) => (
                  <th key={index}>{date.day}</th>
                ))}
                <th scope="col" rowSpan="2">
                  Thời gian làm việc
                </th>
                <th scope="col" rowSpan="2">
                  Số lần đi muộn
                </th>
                <th scope="col" rowSpan="2">
                  Thời gian đi muộn
                </th>
                <th scope="col" rowSpan="2">
                  Số lần về sớm
                </th>
                <th scope="col" rowSpan="2">
                  Thời gian về sớm
                </th>
                <th scope="col" rowSpan="2">
                  Số lần vắng mặt
                </th>
              </tr>
              <tr>
                {dates.map((date, index) => (
                  <th key={index}>{date.date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                filteredAttendanceData.map((employee, index) => {
                  const filteredAttendance = employee.attendance.filter(
                    (record) => {
                      const recordDate = new Date(record.checkIn);
                      return (
                        recordDate.getFullYear() ===
                        selectedMonth.getFullYear() &&
                        recordDate.getMonth() === selectedMonth.getMonth()
                      );
                    }
                  );

                  const totalWorkTime = calculateTotalWorkTime(filteredAttendance);
                  const totalLateCount = filteredAttendance.filter((a) => a.isLate).length || 0;
                  const totalLateTime = filteredAttendance.reduce((acc, curr) => {
                    const lateTime = parseTimeToMinutes(curr.lateTime);
                    return acc + lateTime;
                  }, 0);
                  const totalEarlyLeaveCount = filteredAttendance.filter((a) => a.isEarlyLeave).length || 0;
                  const totalEarlyLeaveTime = filteredAttendance.reduce(
                    (acc, curr) => {
                      const earlyLeaveTime = parseTimeToMinutes(
                        curr.earlyLeaveTime
                      );
                      return acc + earlyLeaveTime;
                    },
                    0
                  );
                  const totalAbsentCount =
                    filteredAttendance.filter((a) => a.isAbsent).length || 0;

                  return (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>{employee.maNv}</td>
                      <td className="sticky-col">{employee.name}</td>
                      {dates.map((date, dateIndex) => {
                        const attendanceRecord = findAttendanceRecord(
                          date,
                          employee.attendance
                        );

                        return (
                          <td
                            key={dateIndex}
                            className={`text-center ${getBadgeClass(
                              attendanceRecord
                            )}`}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p
                                className={`ws-employee d-block badge p-1 font-size-12 mb-0 ${getBadgeClass(
                                  attendanceRecord
                                )}`}
                              >
                                {attendanceRecord &&
                                  (attendanceRecord.leaveRequest
                                    ? "Đã xin nghỉ"
                                    : attendanceRecord.isAbsent
                                      ? "Đã vắng mặt"
                                      : `${formatTime(
                                        attendanceRecord.checkIn
                                      )} - ${attendanceRecord.checkOut
                                        ? formatTime(attendanceRecord.checkOut)
                                        : "Chưa checkout"
                                      }`)}
                              </p>
                            </div>
                          </td>
                        );
                      })}
                      <td>{formatWorkTime(totalWorkTime)}</td>
                      <td>{totalLateCount}</td>
                      <td>{formatLateTime(totalLateTime)}</td>
                      <td>{totalEarlyLeaveCount}</td>
                      <td>{formatLateTime(totalEarlyLeaveTime)}</td>
                      <td>{totalAbsentCount}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
