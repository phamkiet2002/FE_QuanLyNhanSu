import React from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListLeaveDateStyle.scss";

const ListLeaveDate = (props) => {
  const { listLeaveDate, handleShowUpdate, handleShowDelete } = props;

  return (
    <>
      <div className="LeaveDate container">
        <Table className="LeaveDate_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Tên</th>
              <th>Tổng ngày nghỉ</th>
              <th>Số ngày nghỉ trong 1 tháng</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listLeaveDate.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>{item.totalAnnualLeaveDate}</td>
                <td>{item.maximumDaysOffPerMonth}</td>
                <td>{item.description}</td>
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
                      className="btn btn-sm btn-outline-danger m-1"
                      onClick={() => handleShowDelete(item)}
                    >
                      <FaTrashAlt style={{ verticalAlign: "middle" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {listLeaveDate && listLeaveDate.length === 0 && (
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

export default ListLeaveDate;
