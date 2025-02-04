import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListWorkSheduleStyle.scss";
import UpdateWorkSchedule from "../UpdateWorkSchedule/UpdateWorkSchedule";

const ListWorkShedule = (props) => {
  const { listWorkShedule, handleShowUpdate, handleShowDelete } = props;

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  }

  return (
    <>
      <div className="WorkShedule container">
        <Table className="WorkShedule_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Tên</th>
              <th>Thời gian làm việc</th>
              <th>Thời gian nghỉ trưa</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listWorkShedule.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="align-middle">{item.name}</td>
                <td className="align-middle">
                  {formatTime(item.startTime)} <br /> đến <br />{" "}
                  {formatTime(item.endTime)}
                </td>
                <td className="align-middle">
                  {formatTime(item.breakStartTime)} <br /> đến <br />{" "}
                  {formatTime(item.breakEndTime)}
                </td>
                <td className="align-middle">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-sm btn-outline-primary m-1"
                      onClick={() => handleShowUpdate(item)}
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
            {listWorkShedule && listWorkShedule.length === 0 && (
              <tr>
                <td className="text-center align-middle" colSpan={"7"}>
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

export default ListWorkShedule;
