import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListContractStyle.scss";

const ListContract = (props) => {
  const { listContract, handleShowUpdate } = props;

  return (
    <>
      <div className="Contract container">
        <Table className="Contract_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Số hợp đồng</th>
              <th>Ngày ký</th>
              <th>Ngày hiệu lực</th>
              <th>Ngày hết hạn</th>

              <th>Thông tin nhân viên</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listContract.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.contracNumber}</td>
                <td>
                  {new Date(item.signDate).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(item.effectiveDate).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(item.expirationDate).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td>
                  {item.employee.maNv}
                  <br />
                  {item.employee.name}
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
                    <button className="btn btn-sm btn-outline-danger m-1">
                      <FaTrashAlt style={{ verticalAlign: "middle" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {listContract && listContract.length === 0 && (
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

export default ListContract;
