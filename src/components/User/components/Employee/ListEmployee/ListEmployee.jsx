import React from "react";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaMoneyBillAlt,
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaLevelUpAlt,
} from "react-icons/fa";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Table,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import "./ListEmployeeStyle.scss";

const ListEmployee = (props) => {
  const {
    listEmployee,
    handleShowUpdateEmloyeeSalary,
    handleShowUpdateEmloyeePosition,
    handleShowUpdateEmloyeeWorkPlace,
    handleShowUpdateEmloyeeLevel,
    handleShowUpdateEmloyeeDepartment,
  } = props;
  const navigate = useNavigate();

  const handleDetailView = (employee) => {
    navigate("/detail-employee", {
      state: {
        employee: {
          id: employee.id,
        },
      },
    });
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
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listEmployee.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.maNv}</td>
                <td style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                  <br />
                  <span>{item.email}</span>
                </td>
                <td>{item.phone}</td>
                <td>{item.workPlace.name}</td>
                <td>
                  {item.employeeDepartments
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <span key={index}>{dept.department.name}</span>
                    ))}
                </td>
                <td>
                  {item.employeePositions
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <span key={index}>{dept.position.name}</span>
                    ))}
                </td>
                <td>
                  {item.employeeLevels
                    .filter((x) => x.status == "Active")
                    .map((dept, index) => (
                      <span key={index}>{dept.level.name}</span>
                    ))}
                </td>
                <td>
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
                <td>
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
                        <Dropdown.Item
                          onClick={() => handleShowUpdateEmloyeeSalary(item)}
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

                        <Dropdown.Item
                          onClick={() => handleShowUpdateEmloyeePosition(item)}
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

                        <Dropdown.Item
                          onClick={() => handleShowUpdateEmloyeeWorkPlace(item)}
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

                        <Dropdown.Item
                          onClick={() =>
                            handleShowUpdateEmloyeeDepartment(item)
                          }
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

                        <Dropdown.Item
                          onClick={() => handleShowUpdateEmloyeeLevel(item)}
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
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
            {listEmployee && listEmployee.length === 0 && (
              <tr>
                <td className="text-center" colSpan={"9"}>
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
