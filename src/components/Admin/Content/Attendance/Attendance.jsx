import React, { useEffect, useState, useMemo } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./AttendanceStyle.scss";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import {
  getAllAttendance,
  updateOvertimeOutsideWorkHours,
} from "../../../../services/AttendanceService";
import UpdateAbsent from "./UpdateAbsent/UpdateAbsent";
import UpdateAttendance from "./UpdateAttendance/UpdateAttendance";
import Pagination from "../../../Common/Pagination/Pagination";
import MonthDatepicker from "../../../Common/MonthDatepicker/MonthDatepicker";
import { getAttendanceReport } from "../../../../services/ReportService";
import ListAttendance from "./ListAttendance/ListAttendance";
import UpdateOvertimeOutsideWorkHours from "./UpdateOvertimeOutsideWorkHours/UpdateOvertimeOutsideWorkHours";
import CreateAttendance from "./CreateAttendance/CreateAttendance";
import { FaFileExcel } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const Attendance = () => {
  const { user } = useAuth();

  const roleAccess = {
    create: ["ADMIN", "HR_MANAGER"],
    update: ["ADMIN", "HR_MANAGER"],
    updateOvertimeOutsideWorkHours: [
      "ADMIN",
      "HR_MANAGER",
      "DEPARTMENT_MANAGER",
    ],
    view: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    delete: ["ADMIN", "HR_MANAGER"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [filterText, setFilterText] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAttendanceRecord, setSelectedAttendanceRecord] =
    useState(null);
  const [showOvertimeModal, setShowOvertimeModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAbsentModal, setShowAbsentModal] = useState(false);
  const [selectedAbsentRecord, setSelectedAbsentRecord] = useState(null);

  const fetchWorkPlace = async () => {
    try {
      const res = await getAllWorkPlace("", 1, 100);
      setWorkPlaces(res.value.items);
    } catch (error) {
      console.error("Error fetching workplaces:", error);
    }
  };

  useEffect(() => {
    fetchWorkPlace();
  }, []);

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, "0")}-01`; // Format: YYYY-MM-DD
  };

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

  const parseTimeSpanToMinutes = (timeSpanString) => {
    if (!timeSpanString || timeSpanString.includes("0001-01-01")) return 0;

    const [daysPart, timePart] = timeSpanString.split(".");
    let days = parseInt(daysPart, 10);

    if (isNaN(days) || days > 31 || days < 0) {
      days = 0;
    }

    const timeParts = timePart ? timePart.split(":") : [];

    let hours = 0,
      minutes = 0,
      seconds = 0;

    if (timeParts.length >= 3) {
      hours = parseInt(timeParts[0], 10);
      minutes = parseInt(timeParts[1], 10);
      seconds = parseFloat(timeParts[2]);
    }

    const totalMinutes = days * 24 * 60 + hours * 60 + minutes + seconds / 60;

    return totalMinutes;
  };

  const formatWorkTime = (timeString) => {
    if (!timeString) return "0h 0p";

    const [daysPart, timePart] = timeString.split(".");
    const days = parseInt(daysPart, 10) || 0;
    const [hours = 0, minutes = 0] = (timePart || "0:0").split(":").map(Number);

    const totalHours = days * 24 + hours;
    const totalMinutes = minutes;

    return `${totalHours}h ${totalMinutes}p`;
  };

  const formatLateTime = (minutes) => {
    if (minutes <= 0) return "0p";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    if (hours > 0) {
      return `${hours}h${remainingMinutes}p`;
    }
    return `${remainingMinutes}p`;
  };

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const month = getMonthDates(selectedMonth);
      const response = await getAllAttendance(
        selectedWorkPlace,
        month,
        pageIndex,
        pageSize
      );

      if (!response.isSuccess) {
        throw new Error(response.error?.message || "Có lỗi xảy ra");
      }

      const employeeData = response.value.items || [];
      setTotalCount(response.value.totalCount);
      setPageSize(response.value.pageSize);

      const formattedData = employeeData.map((employee) => {
        return {
          id: employee.id,
          name: employee.name,
          maNv: employee.maNV,
          totalTimeAttendance: employee.totalTimeAttendance || "00:00:00",
          totalLateCount: employee.totalDayLate || 0,
          totalLateTimeMinutes: parseTimeSpanToMinutes(
            employee.totalTimeDayLate
          ),
          totalEarlyLeaveCount: employee.totalDayEarlyLeave || 0,
          totalEarlyLeaveTimeMinutes: parseTimeSpanToMinutes(
            employee.totalTimeDayEarlyLeave
          ),
          totalAbsentCount: employee.totalDayAbsent || 0,
          attendance: employee.attendances
            ? employee.attendances.map((record) => ({
                id: record.id,
                date: formatDate(record.checkIn),
                checkIn: record.checkIn,
                checkOut: record.checkOut,
                isLate: record.isLate,
                isEarlyLeave: record.isEarlyLeave,
                overtimeOutsideWorkHours: record.overtimeOutsideWorkHours,
                startTime: record.startTime,
                endTime: record.endTime,
                isAbsent: record.isAbsent,
                leaveRequest: record.leaveRequest,
                createdDate: record.createdDate,
              }))
            : [],
        };
      });

      setAttendanceData(formattedData);
      setError(null);
    } catch (err) {
      setError("Có lỗi xảy ra khi tải dữ liệu: " + err.message);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );

    const daysInMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    ).getDate();

    const daysOfWeek = ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"];

    const newDates = Array.from({ length: daysInMonth }, (_, i) => {
      const currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        i + 1
      );
      return {
        date: currentDate.toLocaleDateString("vi-VN"),
        day: daysOfWeek[currentDate.getDay()],
        fullDate: currentDate,
      };
    });

    setDates(newDates);
    fetchAttendanceData();
  }, [selectedMonth, pageIndex, pageSize, selectedWorkPlace]);

  const handleClear = () => {
    setFilterText("");
    setSelectedWorkPlace("");
  };

  const handleShowOvertimeModal = (attendance) => {
    setSelectedAttendance(attendance);
    setShowOvertimeModal(true);
  };

  const handleExportExcel = async () => {
    try {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth() + 1;
      const pageindex = pageIndex;
      const pagesize = pageSize;
      const workplacename = selectedWorkPlace;

      const response = await getAttendanceReport(
        workplacename,
        `${month}/${year}`,
        pageindex,
        pagesize
      );

      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Attendance_${month}_${year}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Xuất file Excel thành công!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Lỗi khi xuất file Excel!");
    }
  };

  const getBadgeClass = (record) => {
    if (!record) return "";
    if (record.leaveRequest) {
      return "span-leave-request";
    }
    if (record.isAbsent && !record.leaveRequest) {
      return "span-absent";
    }
    if (record.isLate || record.isEarlyLeave) {
      return "span-warning";
    }
    if (record.isEdited) {
      return "span-edited";
    }
    if (record.overtimeOutsideWorkHours) {
      return "span-overtime";
    }
    return "span-success";
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
    const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
    setSelectedMonth(newDate);
    setPageIndex(1);
  };

  const filteredAttendanceData = useMemo(() => {
    return attendanceData.filter((employee) =>
      employee.maNv
        ? employee.maNv.toLowerCase().includes(filterText.toLowerCase())
        : false
    );
  }, [attendanceData, filterText]);

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

  const handleCellClick = (employee, date) => {
    const attendanceRecord = findAttendanceRecord(date, employee.attendance);
    if (!attendanceRecord) {
      setSelectedEmployeeId(employee.id);
      setSelectedDate(date.fullDate);
      setShowCreate(true);
    }
  };

  const handleShowUpdateOptions = (e, attendanceRecord) => {
    e.stopPropagation();
    setSelectedAttendanceRecord(attendanceRecord);
  };

  return (
    <div className="Attendance container-fluid">
      <Row className="mb-3 row-tool">
        <Col xs={6} md={3}>
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
        <Col xs={6} md={3}>
          <Form.Select
            value={selectedWorkPlace}
            onChange={(e) => setSelectedWorkPlace(e.target.value)}
          >
            <option value="">Tất cả nơi làm việc</option>
            {workPlaces.map((workplace) => (
              <option key={workplace.id} value={workplace.name}>
                {workplace.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} md={3}>
          <MonthDatepicker value={selectedMonth} onChange={handleDateChange} />
        </Col>
        <Col xs={6} md={3}>
          <Button
            onClick={handleExportExcel}
            className="btn btn-sm btn-label btn-primary py-2"
          >
            <FaFileExcel
              style={{
                marginRight: "8px",
                verticalAlign: "middle",
                color: "#fff",
              }}
            />
            Xuất Excel
          </Button>
        </Col>
      </Row>

      <ListAttendance
        loading={loading}
        error={error}
        dates={dates}
        filteredAttendanceData={filteredAttendanceData}
        pageIndex={pageIndex}
        pageSize={pageSize}
        findAttendanceRecord={findAttendanceRecord}
        handleCellClick={handleCellClick}
        getBadgeClass={getBadgeClass}
        formatTime={formatTime}
        formatWorkTime={formatWorkTime}
        formatLateTime={formatLateTime}
        setSelectedAttendanceRecord={setSelectedAttendanceRecord}
        setShowUpdate={setShowUpdate}
        handleShowOvertimeModal={handleShowOvertimeModal}
        setShowAbsentModal={setShowAbsentModal}
        setSelectedAbsentRecord={setSelectedAbsentRecord}
      />

      {!loading && !error && (
        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
      {hasPermision("create") && (
        <CreateAttendance
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          employeeId={selectedEmployeeId}
          date={selectedDate}
          onSuccess={fetchAttendanceData}
        />
      )}
      {(hasPermision("update") ||
        hasPermision("updateOvertimeOutsideWorkHours")) && (
        <>
          <UpdateAttendance
            showUpdate={showUpdate}
            setShowUpdate={setShowUpdate}
            dataUpdate={selectedAttendanceRecord}
            fetchListAttendance={fetchAttendanceData}
          />
          {hasPermision("updateOvertimeOutsideWorkHours") && (
            <UpdateOvertimeOutsideWorkHours
              showModal={showOvertimeModal}
              setShowModal={setShowOvertimeModal}
              selectedAttendance={selectedAttendance}
              updateOvertimeOutsideWorkHours={updateOvertimeOutsideWorkHours}
              fetchAttendanceData={fetchAttendanceData}
            />
          )}
        </>
      )}
      {hasPermision("delete") && (
        <UpdateAbsent
          showModal={showAbsentModal}
          setShowModal={setShowAbsentModal}
          selectedAttendance={selectedAbsentRecord}
          fetchAttendanceData={fetchAttendanceData}
        />
      )}
    </div>
  );
};

export default Attendance;
