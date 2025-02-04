import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import "./ListDepartmentStyle.scss";
import { useAuth } from "../../../../context/AuthContext";

const ListDepartment = (props) => {
  const { listDepartment, handleShowUpdate, handleShowDelete } = props;

  const { user } = useAuth();

  const roleAccess = {
    update: ["ADMIN"],
    delete: ["ADMIN"],
  };

  const hasPermission = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Chuyển đổi sang 12 giờ
    return `${formattedHour}:${minutes} ${period}`;
  }

  return (
    <>
      <div className="Department container">
        <Table className="Department_table" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Tên phòng ban</th>
              <th>Mô tả</th>
              <th>Thời gian làm việc</th>
              <th>Thời gian nghỉ trưa</th>
              {(hasPermission("update") || hasPermission("delete")) && (
                <th>Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody>
            {listDepartment.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <span>{formatTime(item.workShedule.startTime)}</span>
                  <br />
                  đến
                  <br />
                  <span>{formatTime(item.workShedule.endTime)}</span>
                </td>
                <td>
                  <span>{formatTime(item.workShedule.breakStartTime)}</span>
                  <br />
                  đến
                  <br />
                  <span>{formatTime(item.workShedule.breakEndTime)}</span>
                </td>
                <td>
                  {hasPermission("update") && (
                    <button
                      onClick={() => handleShowUpdate(item)}
                      className="btn btn-sm btn-outline-primary m-1"
                    >
                      <FaEdit style={{ verticalAlign: "middle" }} />
                    </button>
                  )}

                  {hasPermission("delete") && (
                    <button
                      className="btn btn-sm btn-outline-danger m-1"
                      onClick={() => handleShowDelete(item)}
                    >
                      <FaTrashAlt style={{ verticalAlign: "middle" }} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {listDepartment && listDepartment.length === 0 && (
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

export default ListDepartment;
