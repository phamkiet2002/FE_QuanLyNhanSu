import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";
import "./ListPositionStyle.scss";

const ListPosition = (props) => {
  const { listPosition, handleShowUpdate, handleShowDelete } = props;

  return (
    <>
      <div className="Position container">
        <Table className="Position_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Chức vụ</th>
              <th>Mô tả</th>
              <th>Quyền truy cập</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listPosition.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  {item.positionRoles.map((role, index) => (
                    <span key={index}>{role.appRole.name},</span>
                  ))}
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
                      className="btn btn-sm btn-outline-danger m-1"
                      onClick={() => handleShowDelete(item)}
                    >
                      <FaTrashAlt style={{ verticalAlign: "middle" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {listPosition && listPosition.length === 0 && (
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

export default ListPosition;
