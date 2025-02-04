import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListAlowanceStyle.scss";
import { NumericFormat } from "react-number-format";

const ListAlowance = (props) => {
  const { listAlowance, handleShowUpdate, handleShowDelete } = props;

  const loaiPhuCap = {
    Phucapdienthoai: "Phụ cấp điện thoại",
    Phucapdilai: "Phụ cấp đi lại",
    Phucaptienantrua: "Phụ cấp tiền ăn trưa",
    Phucapxangxe: "Phụ cấp xăng xe",
  };

  return (
    <>
      <div className="Alowance container">
        <Table className="Alowance_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Loại phụ cấp</th>
              <th>Nơi làm việc</th>
              <th>Số tiền phụ cấp</th>
              <th>Ngày hiệu lực</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listAlowance.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{loaiPhuCap[item.typeOfAllowance]}</td>
                <td>
                  {item.isAllWorkPlace
                    ? "Tất cả nơi làm việc"
                    : item.workPlaceAndAllowanceAndPenalties
                        .filter((wp) => wp.status === "Active")
                        .map((wp, idx) => (
                          <span key={idx}>{wp.workPlace.name}</span>
                        ))}
                </td>
                <td>
                  <NumericFormat
                    key={index}
                    value={item.money}
                    thousandSeparator=","
                    suffix=" VND"
                    displayType="text"
                    className="form-control"
                    renderText={(value) => <span>{value}</span>}
                  />
                </td>
                <td>{new Date(item.effectiveDate).toLocaleDateString()}</td>
                <td>{item.note}</td>
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
            {listAlowance && listAlowance.length === 0 && (
              <tr>
                <td className="text-center" colSpan={"7"}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListAlowance;
