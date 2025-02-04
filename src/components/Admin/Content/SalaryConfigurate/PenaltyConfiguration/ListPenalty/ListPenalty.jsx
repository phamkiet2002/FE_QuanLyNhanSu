import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListPenaltyStyle.scss";
import { NumericFormat } from "react-number-format";

const ListPenalty = (props) => {
  const { listPenalty, handleShowUpdate, handleShowDelete } = props;

  const loaiPhat = {
    Dimuon: "Đi muộn",
    Vesom: "Về sớm",
    Tunghikhongphep: "Tự nghỉ không phép",
    Nghiquangayphep: "Nghỉ quá ngày phép",
    RaNgoaiQuaGio: "Ra ngoài quá giờ",
  };

  return (
    <>
      <div className="Penalty container">
        <Table className="Penalty_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Loại phạt</th>
              <th>Nơi làm việc</th>
              <th>Số tiền phạt</th>
              <th>Ngày hiệu lực</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listPenalty.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{loaiPhat[item.typeOfPenalty]}</td>
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
                    <button className="btn btn-sm btn-outline-danger m-1"
                    onClick={() => handleShowDelete(item)}
                    >
                      <FaTrashAlt style={{ verticalAlign: "middle" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {listPenalty && listPenalty.length === 0 && (
              <tr>
                <td className="text-center" colSpan={"6"}>
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

export default ListPenalty;
