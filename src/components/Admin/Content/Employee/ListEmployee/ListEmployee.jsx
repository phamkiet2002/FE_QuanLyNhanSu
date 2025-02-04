import React from "react";
import {
  FaEye,
  FaMoneyBillAlt,
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaLevelUpAlt,
  FaUserTimes,
} from "react-icons/fa";
import { Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useAuth } from "../../../../context/AuthContext";
import "./ListEmployeeStyle.scss";

const ListEmployee = (props) => {
  const {
    listEmployee,
    handleShowUpdateEmloyeeSalary,
    handleShowUpdateEmloyeePosition,
    handleShowUpdateEmloyeeWorkPlace,
    handleShowUpdateEmloyeeLevel,
    handleShowUpdateEmloyeeDepartment,
    handleShowEmployeeLeaveWork,
  } = props;
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDetailView = (employee) => {
    navigate("/detail-employee", {
      state: {
        employee: {
          id: employee.id,
        },
      },
    });
  };

  const roleAccess = {
    salary: ["ADMIN", "HR_MANAGER"],
    position: ["ADMIN"],
    workplace: ["ADMIN"],
    department: ["ADMIN"],
    level: ["ADMIN"],
    leaveWork: ["ADMIN", "HR_MANAGER"],
  };

  const hasPermission = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  return (
    <>
      <div className="Employee container">
        <Table className="Employee_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Mã nhân viên</th>
              <th>Tên nhân viên</th>
              <th>Số điện thoại</th>
              <th>Nơi làm việc</th>
              <th>Phòng ban</th>
              <th>Chức vụ</th>
              <th>Level</th>
              <th>Lương</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listEmployee.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="align-middle">{item.maNV}</td>
                <td
                  className="align-middle"
                  style={{ textAlign: "left", whiteSpace: "nowrap" }}
                >
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                  <br />
                  <span>{item.email}</span>
                </td>
                <td className="align-middle">{item.phone}</td>
                <td className="align-middle">{item.workPlace.name}</td>
                <td className="align-middle">
                  {item.employeeDepartments
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <span key={index}>{dept.department.name}</span>
                    ))}
                </td>
                <td className="align-middle">
                  {item.employeePositions
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <span key={index}>{dept.position.name}</span>
                    ))}
                </td>
                <td className="align-middle">
                  {item.employeeLevels
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <span key={index}>{dept.level.name}</span>
                    ))}
                </td>
                <td className="align-middle">
                  {item.salarys
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <NumericFormat
                        key={index}
                        value={dept.salarys}
                        thousandSeparator=","
                        suffix=" VND"
                        displayType="text"
                        className="form-control"
                        renderText={(value) => <span>{value}</span>}
                      />
                    ))}
                </td>
                <td className={`Employee_Status_${item.status} align-middle`}>
                  {item.status == "Active"
                    ? "Đang làm việc"
                    : item.status == "InActive"
                    ? "Đã nghỉ việc"
                    : ""}
                </td>
                <td className="align-middle">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      title="Xem chi tiết nhân viên"
                      onClick={() => handleDetailView(item)}
                      className="btn btn-sm btn-outline-primary"
                      style={{ height: "30.73px", width: "30.5px" }}
                    >
                      <FaEye style={{ verticalAlign: "middle" }} />
                    </button>

                    {item.status === "Active" && hasPermission("salary") && (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline-primary"
                          size="sm"
                          id={`dropdown-${index}`}
                          split
                          style={{
                            height: "30.73px",
                            width: "30.5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="custom-dropdown-toggle"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          {hasPermission("salary") && (
                            <Dropdown.Item
                              onClick={() =>
                                handleShowUpdateEmloyeeSalary(item)
                              }
                              className="text-dark"
                            >
                              <FaMoneyBillAlt
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                  color: "#007bff",
                                }}
                              />
                              Thay đổi lương
                            </Dropdown.Item>
                          )}

                          {hasPermission("position") && (
                            <Dropdown.Item
                              onClick={() =>
                                handleShowUpdateEmloyeePosition(item)
                              }
                              className="text-dark"
                            >
                              <FaBriefcase
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                  color: "#007bff",
                                }}
                              />
                              Thay đổi chức vụ
                            </Dropdown.Item>
                          )}

                          {hasPermission("workplace") && (
                            <Dropdown.Item
                              onClick={() =>
                                handleShowUpdateEmloyeeWorkPlace(item)
                              }
                              className="text-dark"
                            >
                              <FaBuilding
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                  color: "#007bff",
                                }}
                              />
                              Thay đổi nơi làm việc
                            </Dropdown.Item>
                          )}

                          {hasPermission("department") && (
                            <Dropdown.Item
                              onClick={() =>
                                handleShowUpdateEmloyeeDepartment(item)
                              }
                              className="text-dark"
                            >
                              <FaUsers
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                  color: "#007bff",
                                }}
                              />
                              Thay đổi phòng ban
                            </Dropdown.Item>
                          )}

                          {hasPermission("level") && (
                            <Dropdown.Item
                              onClick={() => handleShowUpdateEmloyeeLevel(item)}
                              className="text-dark"
                            >
                              <FaLevelUpAlt
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                  color: "#007bff",
                                }}
                              />
                              Thay đổi Level
                            </Dropdown.Item>
                          )}

                          {hasPermission("leaveWork") && (
                            <Dropdown.Item
                              className="text-danger"
                              onClick={() => handleShowEmployeeLeaveWork(item)}
                            >
                              <FaUserTimes
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                  color: "#dc3545",
                                }}
                              />
                              Cho nghỉ việc
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {listEmployee && listEmployee.length === 0 && (
              <tr>
                <td className="text-center" colSpan={"10"}>
                  Not found Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListEmployee;
