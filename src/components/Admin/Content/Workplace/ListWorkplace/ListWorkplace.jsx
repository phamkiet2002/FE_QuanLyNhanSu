import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaWifi } from "react-icons/fa";
import { Row, Col, InputGroup, Form, Button, Table } from "react-bootstrap";
import "./ListWorkplaceStyle.scss";
import { useAuth } from "../../../../context/AuthContext";
import { has } from "lodash";

const ListWorkplace = (props) => {
  const {
    listWorkPlaces,
    handleShowUpdate,
    handleShowDelete,
    handleShowWifiConfig,
  } = props;


  const { user } = useAuth();

  const roleAccess = {
    view: ["ADMIN", "HR_MANAGER"],
    create: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  return (
    <>
      <div className="WorkPlace container">
        <Table className="WorkPlace_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Điểm làm việc</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Cấu hình wifi</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listWorkPlaces.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.wifiConfig?.ssid}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      onClick={() => handleShowWifiConfig(item)}
                      className="btn btn-sm btn-outline-info m-1"
                      title="Cấu hình WiFi"
                    >
                      <FaWifi style={{ verticalAlign: "middle" }} />
                    </button>
                    {
                      hasPermision("update") && (
                        <button
                          onClick={() => handleShowUpdate(item)}
                          className="btn btn-sm btn-outline-primary m-1"
                          title="Update"
                        >
                          <FaEdit style={{ verticalAlign: "middle" }} />
                        </button>
                      )
                    }
                    {
                      hasPermision("delete") && (
                        <button
                          className="btn btn-sm btn-outline-danger m-1"
                          onClick={() => handleShowDelete(item)}
                          title="Delete"
                        >
                          <FaTrashAlt style={{ verticalAlign: "middle" }} />
                        </button>
                      )
                    }
                  </div>
                </td>
              </tr>
            ))}
            {listWorkPlaces && listWorkPlaces.length === 0 && (
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

export default ListWorkplace;
