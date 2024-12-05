import React, { useEffect, useState, useMemo } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "./AttendanceStyle.scss";
import { getAllAttendance } from "../../../../services/AttendanceService";
import Pagination from "../../../Common/Pagination/Pagination";
import WeekDatepicker from "../../../Common/WeekDatePicker/WeekDatepicker";

const Attendance = () => {
  const [filterText, setFilterText] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDates = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust for starting on Monday
    start.setDate(diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatTime = (dateString) => {
    if (!dateString || dateString.includes("0001-01-01")) return "";
    return new Date(dateString).toLocaleTimeString("vi-VN", {
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
    if (!minutes) return "0";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h${remainingMinutes}p`;
    }
    return `${remainingMinutes}p`;
  };

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const { start, end } = getWeekDates(selectedDate);
      const response = await getAllAttendance(pageIndex, pageSize, start, end);

      if (!response.isSuccess) {
        throw new Error(response.error?.message || "Có lỗi xảy ra");
      }

      const employeeData = response.value.items || [];
      setTotalCount(response.value.totalCount);
      setPageSize(response.value.pageSize);

      const formattedData = employeeData.map((employee) => ({
        id: employee.id,
        name: employee.name,
        maNv: employee.maNv,
        attendance: employee.attendances
          ? employee.attendances.map((record) => ({
              date: formatDate(record.checkIn),
              checkIn: record.checkIn,
              checkOut: record.checkOut,
              isLate: record.isLate,
              isEarlyLeave: record.isEarlyLeave,
              lateTime: record.lateTime,
              earlyLeaveTime: record.earlyLeaveTime,
            }))
          : [],
      }));

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

  useEffect(() => {
    const { start } = getWeekDates(selectedDate);
    const startDate = new Date(start);
    const newDates = Array.from({ length: 7 }, (_, i) => {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      return {
        date: nextDate.toLocaleDateString("vi-VN"),
        day: nextDate.toLocaleDateString("vi-VN", { weekday: "short" }),
        fullDate: nextDate,
      };
    });
    setDates(newDates);
    fetchAttendanceData();
  }, [selectedDate, pageIndex, pageSize]);

  const handleClear = () => {
    setFilterText("");
  };

  const getBadgeClass = (record) => {
    if (!record) return "badge-warning";
    if (record.isLate || record.isEarlyLeave) return "badge-warning";
    return "badge-success";
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex * pageSize < totalCount) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPageIndex(1);
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
        const workTime = (checkOutTime - checkInTime) / (1000 * 60); // thời gian làm việc tính bằng phút
        return total + workTime;
      }
      return total;
    }, 0);
  };

  const formatWorkTime = (minutes) => {
    if (minutes < 0) return "0h 0p";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}p`;
  };

  return (
    <div className="Attendance container-fluid">
      <Row className="mb-3 row-tool">
        <Col xs={6} md={4}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Nhập mã nhân viên"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleClear}>
              X
            </Button>
          </InputGroup>
        </Col>
        <div className="col-lg-6 d-inline-flex flex-wrap">
          <WeekDatepicker value={selectedDate} onChange={handleDateChange} />
        </div>
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
          <p className="mb-0 d-flex align-items-center font-size-12">
            <span className="edited mr-2 span-edited"></span> Đã chỉnh sửa
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
              </tr>
              <tr>
                {dates.map((date, index) => (
                  <th key={index}>{date.date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAttendanceData.map((employee, index) => {
                const totalWorkTime = calculateTotalWorkTime(
                  employee.attendance
                );
                return (
                  <tr key={employee.id}>
                    <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                    <td>{employee.maNv}</td>
                    <td className="sticky-col">{employee.name}</td>
                    {dates.map((date, dateIndex) => {
                      const attendanceRecord = employee.attendance.find(
                        (record) => record.date === date.date
                      );
                      return (
                        <td key={dateIndex} className="min-w-120 text-center">
                          <p
                            className={`ws-employee d-block badge p-1 font-size-12 cursor-pointer ${getBadgeClass(
                              attendanceRecord
                            )}`}
                          >
                            {attendanceRecord
                              ? `${formatTime(attendanceRecord.checkIn)} - ${
                                  attendanceRecord.checkOut
                                    ? formatTime(attendanceRecord.checkOut)
                                    : "Chưa checkout"
                                }`
                              : ""}
                          </p>
                        </td>
                      );
                    })}
                    <td>{formatWorkTime(totalWorkTime)}</td>
                    <td>
                      {employee.attendance.filter((a) => a.isLate).length || 0}
                    </td>
                    <td>
                      {formatLateTime(
                        employee.attendance.reduce((acc, curr) => {
                          const lateTime = parseTimeToMinutes(curr.lateTime);
                          return acc + lateTime;
                        }, 0)
                      )}
                    </td>
                    <td>
                      {employee.attendance.filter((a) => a.isEarlyLeave)
                        .length || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </div>
        </div>
      )}

      {!loading && !error && (
        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

export default Attendance;
