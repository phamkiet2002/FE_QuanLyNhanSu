import React from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListAttendanceSettingStyle.scss";

const ListAttendanceSetting = (props) => {
  const { listAttendanceSetting, handleShowUpdate, handleShowDelete } = props;

  return (
    <>
      <div className="AttendanceSetting container">
        <Table className="AttendanceSetting_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Thời gian cho phép đi trễ</th>
              <th>Thời gian cho phép về sớm</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listAttendanceSetting.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.maximumLateAllowed}</td>
                <td>{item.maxEarlyLeaveAllowed}</td>
                <td className={`AttendanceSetting_Status_${item.status}`}>
                  {item.status == "Active"
                    ? "Hoạt động"
                    : item.status == "InActive"
                    ? "Ngừng hoạt động"
                    : "Không xác định"}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      onClick={() => handleShowUpdate(item)}
                      className="btn btn-sm btn-outline-primary m-1"
                    >
                      <FaEdit style={{ verticalAlign: "middle" }} />
                    </button>
                    <button
                      onClick={() => handleShowDelete(item)}
                      className="btn btn-sm btn-outline-danger m-1"
                    >
                      <FaTrashAlt style={{ verticalAlign: "middle" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {listAttendanceSetting && listAttendanceSetting.length === 0 && (
              <tr>
                <td className="text-center" colSpan={"7"}>
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

export default ListAttendanceSetting;
