import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import "./ListContractStyle.scss";
import { useAuth } from "../../../../context/AuthContext";

const ListContract = (props) => {
  const { listContract, handleShowUpdate } = props;

  const { user } = useAuth();

  const roleAccess = {
    update: ["ADMIN", "HR_MANAGER"],
  
  };

  const hasPermission = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

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
                  {item.employee.maNV}
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
                    {hasPermission("update") && (
                      <button
                        onClick={() => handleShowUpdate(item)}
                        className="btn btn-sm btn-outline-primary m-1"
                      >
                        <FaEdit style={{ verticalAlign: "middle" }} />
                      </button>
                    )}
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