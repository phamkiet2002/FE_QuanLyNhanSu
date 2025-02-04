import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.scss";
import logobado from "../../../assets/logobado.svg";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaClock,
  FaLevelUpAlt,
  FaUserTie,
  FaCalendarAlt,
  FaUser,
  FaRegCalendarCheck,
  FaFileContract,
  FaMoneyBillWave,
  FaCalculator,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../Content/Dashboard/Dashboard";

const Sidebar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar, AdminRole } = props;
  const location = useLocation();
  const { user } = useAuth();

  const roleAccess = {
    dashboard: ["ADMIN", "HR_MANAGER"],
    workplace: ["ADMIN", "HR_MANAGER"],
    department: ["ADMIN", "DEPARTMENT_MANAGER"],
    workschedule: ["ADMIN"],
    level: ["ADMIN"],
    position: ["ADMIN"],
    leavedate: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    employee: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    attendance: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    contract: ["ADMIN", "HR_MANAGER"],
    payroll: ["ADMIN", "HR_MANAGER"],
    leaveregistration: ["ADMIN", "HR_MANAGER", "DEPARTMENT_MANAGER"],
    allowance: ["ADMIN", "HR_MANAGER"],
    penalty: ["ADMIN", "HR_MANAGER"],
    attendanceSetting: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  return (
    <ProSidebar
      image={""}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader
        className={`sidebar_header ${collapsed ? "collapsed" : ""}`}
      >
        <div
          style={{
            padding: "10px",
            height: "60px",
            lineHeight: "30px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <img src={logobado} height="45px" width="100%" alt="Logo" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {hasPermision("dashboard") && (
            <MenuItem
              icon={<FaHome />}
              active={location.pathname === "/dashboard"}
            >
              Tổng quan <Link to="/dashboard" />
            </MenuItem>
          )}
          {hasPermision("workplace") && (
            <MenuItem
              icon={<FaBuilding />}
              active={location.pathname === "/manage-workplace"}
            >
              Điểm Làm Việc <Link to="/manage-workplace" />
            </MenuItem>
          )}

          {hasPermision("workschedule") && (
            <MenuItem
              icon={<FaClock />}
              active={location.pathname === "/manage-workshedule"}
            >
              Thời gian làm việc <Link to="/manage-workshedule" />
            </MenuItem>
          )}
          {hasPermision("department") && (
            <MenuItem
              icon={<FaUsers />}
              active={location.pathname === "/manage-department"}
            >
              Phòng Ban <Link to="/manage-department" />
            </MenuItem>
          )}

          {hasPermision("level") && (
            <MenuItem
              icon={<FaLevelUpAlt />}
              active={location.pathname === "/manage-level"}
            >
              Level <Link to="/manage-level" />
            </MenuItem>
          )}

          {hasPermision("position") && (
            <MenuItem
              icon={<FaUserTie />}
              active={location.pathname === "/manage-position"}
            >
              Chức vụ <Link to="/manage-position" />
            </MenuItem>
          )}

          {hasPermision("leavedate") && (
            <MenuItem
              icon={<FaCalendarAlt />}
              active={location.pathname === "/manage-leavedate"}
            >
              Cấu hình ngày nghỉ <Link to="/manage-leavedate" />
            </MenuItem>
          )}

          {hasPermision("employee") && (
            <MenuItem
              icon={<FaUser />}
              active={location.pathname === "/manage-employee"}
            >
              Nhân viên <Link to="/manage-employee" />
            </MenuItem>
          )}

          {hasPermision("attendance") && (
            <MenuItem
              icon={<FaRegCalendarCheck />}
              active={location.pathname === "/manage-attendance"}
            >
              Chấm công <Link to="/manage-attendance" />
            </MenuItem>
          )}

          {hasPermision("contract") && (
            <MenuItem
              icon={<FaFileContract />}
              active={location.pathname === "/manage-contract"}
            >
              Hợp đồng <Link to="/manage-contract" />
            </MenuItem>
          )}

          {hasPermision("payroll") && (
            <MenuItem
              icon={<FaMoneyBillWave />}
              active={location.pathname === "/pay-roll"}
            >
              Bảng lương <Link to="/pay-roll" />
            </MenuItem>
          )}

          {hasPermision("leaveregistration") && (
            <SubMenu title="Yêu cầu chờ duyệt" icon={<FaCalendarAlt />}>
              <MenuItem
                active={
                  location.pathname === "/manage-Leaveregistration-dayoff"
                }
              >
                Duyệt nghỉ ngày <Link to="/manage-Leaveregistration-dayoff" />
              </MenuItem>
              <MenuItem
                active={
                  location.pathname === "/manage-Leaveregistration-halfdayoff"
                }
              >
                Duyệt nghỉ buổi{" "}
                <Link to="/manage-Leaveregistration-halfdayoff" />
              </MenuItem>
              <MenuItem
                active={location.pathname === "/manage-attendance-approval"}
              >
                Duyệt chấm công <Link to="/manage-attendance-approval" />
              </MenuItem>
            </SubMenu>
          )}

          {(hasPermision("allowance") ||
            hasPermision("penalty") ||
            hasPermision("attendanceSetting")) && (
              <SubMenu title="Cấu hình tính lương" icon={<FaCalculator />}>
                {hasPermision("allowance") && (
                  <MenuItem active={location.pathname === "/manage-alowance"}>
                    Cấu hình phụ cấp <Link to="/manage-alowance" />
                  </MenuItem>
                )}
                {hasPermision("penalty") && (
                  <MenuItem active={location.pathname === "/manage-penalty"}>
                    Cấu hình phạt <Link to="/manage-penalty" />
                  </MenuItem>
                )}
                {hasPermision("attendanceSetting") && (
                  <MenuItem
                    active={location.pathname === "/manage-attendancesetting"}
                  >
                    Cấu hình chấm công <Link to="/manage-attendancesetting" />
                  </MenuItem>
                )}
              </SubMenu>
            )}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div></div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
