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
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard, MdEditCalendar } from "react-icons/md";
import { MdViewModule } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdBusiness } from "react-icons/md";
import { MdScheduleSend } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import { MdCalculate } from "react-icons/md";
import { MdMoney } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
/*...*/
const Sidebar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar, breakPoint } = props;

  const location = useLocation();
  const { pathname } = location;
  return (
    <>
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
            {/* <DiReact size={"3em"} color={"00bfff"} />
            <span>HRM iPAS</span> */}
            <img src={logobado} height="45px " width="100%"></img>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Dashboard */}
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />} active={location.pathname === "/"}>
              Dashboard <Link to="/" />
            </MenuItem>
          </Menu>
          {/* workplace */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdBusiness />}
              active={location.pathname === "/manage-workplace"}
            >
              Điểm Làm Việc <Link to="/manage-workplace" />
            </MenuItem>
          </Menu>
          {/* department */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdViewModule />}
              active={location.pathname === "/manage-department"}
            >
              Phòng Ban <Link to="/manage-department" />
            </MenuItem>
          </Menu>

          {/* workshedule */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdScheduleSend />}
              active={location.pathname === "/manage-workshedule"}
            >
              Thời gian làm việc <Link to="/manage-workshedule" />
            </MenuItem>
          </Menu>

          {/* Level */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/manage-level"}
            >
              Level <Link to="/manage-level" />
            </MenuItem>
          </Menu>

          {/* Position */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/manage-position"}
            >
              Chức vụ <Link to="/manage-position" />
            </MenuItem>
          </Menu>

          {/* Position */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/manage-leavedate"}
            >
              Cấu hình ngày nghỉ <Link to="/manage-leavedate" />
            </MenuItem>
          </Menu>
          {/* Employee */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/manage-employee"}
            >
              Nhân viên <Link to="/manage-employee" />
            </MenuItem>
          </Menu>

          {/* Attendance */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdEditCalendar />}
              active={location.pathname === "/manage-attendance"}
            >
              Chấm công <Link to="/manage-attendance" />
            </MenuItem>
          </Menu>

          {/* Contract */}
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/manage-contract"}
            >
              Hợp đồng <Link to="/manage-contract" />
            </MenuItem>
          </Menu>

          {/* LeaveRegistration */}
          <Menu iconShape="circle">
            <SubMenu
              title="Đăng ký nghỉ"
              icon={<MdScheduleSend />}
              active={
                location.pathname.includes("/manage-Leaveregistration") ||
                location.pathname.includes(
                  "/manage-Leaveregistration-dayoff"
                ) ||
                location.pathname.includes(
                  "/manage-Leaveregistration-halfdayoff"
                )
              }
            >
              <MenuItem
                active={
                  location.pathname === "/manage-Leaveregistration-dayoff"
                }
              >
                Nghỉ ngày <Link to="/manage-Leaveregistration-dayoff" />
              </MenuItem>

              <MenuItem
                active={
                  location.pathname === "/manage-Leaveregistration-halfdayoff"
                }
              >
                Nghỉ buổi <Link to="/manage-Leaveregistration-halfdayoff" />
              </MenuItem>
            </SubMenu>
          </Menu>

          {/* AlowanceAndPenalty */}
          <Menu iconShape="circle">
            <SubMenu
              title="Cấu hình tính lương"
              icon={<MdCalculate />}
              active={
                location.pathname.includes("/manage-alowance") ||
                location.pathname.includes("/manage-penalty") ||
                location.pathname.includes("/manage-attendancesetting")
              }
            >
              {/* Alowance */}
              <MenuItem active={location.pathname === "/manage-alowance"}>
                Cấu hình phụ cấp
                <Link to="/manage-alowance" />
              </MenuItem>
              {/* Penalty */}
              <MenuItem active={location.pathname === "/manage-penalty"}>
                Cấu hình phạt
                <Link to="/manage-penalty" />
              </MenuItem>
              {/* Cấu hính chấm công */}
              <MenuItem
                active={location.pathname === "/manage-attendancesetting"}
              >
                Cấu hình chấm công
                <Link to="/manage-attendancesetting" />
              </MenuItem>
            </SubMenu>
          </Menu>

          {/* test chi tiet */}
          {/* <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/detail-employee"}
            >
              Chi tiết nhân viên <Link to="/detail-employee" />
            </MenuItem>
          </Menu> */}

          {/* test login */}

          <Menu iconShape="circle">
            <MenuItem
              icon={<MdGroup />}
              active={location.pathname === "/manage-login"}
            >
              form dang nhap <Link to="/manage-login" />
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
          // className="sidebar-btn-wrapper"
          // style={{
          //   padding: "20px 24px",
          // }}
          >
            {/* <FaGithub /> */}
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};
export default Sidebar;
