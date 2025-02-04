import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import "./ListLevelStyle.scss";
import { useAuth } from "../../../../context/AuthContext";

const ListLevel = (props) => {
  const { listLevel, handleShowUpdate, handleShowDelete } = props;

  const { user } = useAuth();

  const roleAccess = {
    update: ["ADMIN"],
    delete: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  return (
    <>
      <div className="Department container">
        <Table className="Department_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Tên level</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listLevel.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {hasPermision("update") && (
                      <button
                        onClick={() => handleShowUpdate(item)}
                        className="btn btn-sm btn-outline-primary m-1"
                      >
                        <FaEdit style={{ verticalAlign: "middle" }} />
                      </button>
                    )}
                    {hasPermision("delete") && (
                      <button
                        onClick={() => handleShowDelete(item)}
                        className="btn btn-sm btn-outline-danger m-1"
                      >
                        <FaTrashAlt style={{ verticalAlign: "middle" }} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {listLevel && listLevel.length === 0 && (
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

export default ListLevel;
