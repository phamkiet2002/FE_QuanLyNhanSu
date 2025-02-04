import React from "react";
import "./ListAttendanceStyle.scss";
import { Dropdown } from "react-bootstrap";
import { FaEdit, FaClock } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthContext";

const ListAttendance = (props) => {
  const {
    loading,
    error,
    dates,
    filteredAttendanceData,
    pageIndex,
    pageSize,
    findAttendanceRecord,
    handleCellClick,
    getBadgeClass,
    formatTime,
    formatWorkTime,
    formatLateTime,
    setSelectedAttendanceRecord,
    setShowUpdate,
    handleShowOvertimeModal,
    setShowAbsentModal,
    setSelectedAbsentRecord,
  } = props;

  const { user } = useAuth();

  const roleAccess = {
    update: ["ADMIN", "HR_MANAGER"],
    updateOverTimeOutSide: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    view: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  function formatTimeTotalWorktime(input) {
    if (!input || typeof input !== 'string') {
      return "0";
    }
    const [hoursAndMinutes] = input.split('.');
    if (!hoursAndMinutes) {
      return "0";
    }
    const [hours, minutes] = hoursAndMinutes.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return "0";
    }
    return `${hours}h${minutes}p`;
  }

  return (
    <>
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
          <p className="mr-3 mb-0 d-flex align-items-center font-size-12">
            <span className="leave-request mr-2 span-leave-request"></span> Đã
            xin nghỉ
          </p>
          <p className="mb-0 d-flex align-items-center font-size-12">
            <span className="absent mr-2 span-absent"></span> Vắng mặt
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
                <th scope="col" rowSpan="2">
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
                  {" "}
                  Số lần đi muộn{" "}
                </th>
                <th scope="col" rowSpan="2">
                  Thời gian đi muộn
                </th>
                <th scope="col" rowSpan="2">
                  Số lần về sớm
                </th>
                <th scope="col" rowSpan="2">
                  {" "}
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
              {filteredAttendanceData.map((employee, index) => {
                const filteredAttendance = employee.attendance.filter(
                  (record) => {
                    const recordDate = new Date(record.checkIn);
                    return (
                      recordDate.getFullYear() ===
                      new Date(dates[0].fullDate).getFullYear() &&
                      recordDate.getMonth() ===
                      new Date(dates[0].fullDate).getMonth()
                    );
                  }
                );

                return (
                  <tr key={employee.id}>
                    <td>{(pageIndex - 1) * pageSize + index + 1}</td>
                    <td>{employee.maNv}</td>
                    <td className="sticky-col">{employee.name}</td>
                    {dates.map((date, dateIndex) => {
                      const attendanceRecord = findAttendanceRecord(
                        date,
                        employee.attendance
                      );

                      return (
                        <td
                          key={date.fullDate.getTime()}
                          onClick={() => handleCellClick(employee, date)}
                          className={getBadgeClass(attendanceRecord)}
                          style={{ height: "48.8px" }}
                        >
                          <div className="d-flex justify-content-between align-items-center h-100">
                            <p
                              className={`ws-employee d-block badge p-1 font-size-12 cursor-pointer mb-0 ${getBadgeClass(
                                attendanceRecord
                              )}`}
                              style={{ lineHeight: 1.2 }}
                            >
                              {attendanceRecord ? (
                                <span className="d-flex align-items-center">
                                  {attendanceRecord.leaveRequest
                                    ? "Đã xin nghỉ"
                                    : attendanceRecord.isAbsent
                                      ? "Đã vắng mặt"
                                      : `${formatTime(
                                        attendanceRecord.checkIn
                                      )} - ${attendanceRecord.checkOut
                                        ? formatTime(
                                          attendanceRecord.checkOut
                                        )
                                        : "Chưa checkout"
                                      }`}

                                  {attendanceRecord.overtimeOutsideWorkHours && (
                                    <span
                                      className="ml-2"
                                      style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#9c27b0",
                                      }}
                                      title="Ra ngoài quá giờ"
                                    />
                                  )}

                                  <Dropdown
                                    className="d-inline ml-1"
                                    style={{ lineHeight: 1 }}
                                  >
                                    <Dropdown.Toggle
                                      variant="link"
                                      size="sm"
                                      style={{
                                        padding: 0,
                                        height: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <FaEdit size={12} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                      style={{ fontSize: "0.875rem" }}
                                    >
                                      {attendanceRecord.isAbsent &&
                                        !attendanceRecord.leaveRequest ? (
                                        hasPermision("update") && (
                                          <Dropdown.Item
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedAbsentRecord(
                                                attendanceRecord
                                              );
                                              setShowAbsentModal(true);
                                            }}
                                          >
                                            <FaEdit
                                              size={12}
                                              className="mr-2"
                                            />
                                            Cập nhật vắng mặt
                                          </Dropdown.Item>
                                        )
                                      ) : (
                                        <>
                                          {hasPermision("update") && (
                                            <Dropdown.Item
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedAttendanceRecord(
                                                  attendanceRecord
                                                );
                                                setShowUpdate(true);
                                              }}
                                            >
                                              <FaEdit
                                                size={12}
                                                className="mr-2"
                                              />
                                              Cập nhật chấm công
                                            </Dropdown.Item>
                                          )}
                                          {hasPermision(
                                            "updateOverTimeOutSide"
                                          ) && (
                                              <Dropdown.Item
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleShowOvertimeModal(
                                                    attendanceRecord
                                                  );
                                                }}
                                              >
                                                <FaClock
                                                  size={12}
                                                  className="mr-2"
                                                />
                                                Cập nhật thời gian ra ngoài
                                              </Dropdown.Item>
                                            )}
                                        </>
                                      )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </span>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                    <td>{formatTimeTotalWorktime(employee.totalTimeAttendance)}</td>
                    <td>{employee.totalLateCount}</td>
                    <td>{formatLateTime(employee.totalLateTimeMinutes)}</td>
                    <td>{employee.totalEarlyLeaveCount}</td>
                    <td>
                      {formatLateTime(employee.totalEarlyLeaveTimeMinutes)}
                    </td>
                    <td>{employee.totalAbsentCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </div>
        </div>
      )}
    </>
  );
};

export default ListAttendance;
