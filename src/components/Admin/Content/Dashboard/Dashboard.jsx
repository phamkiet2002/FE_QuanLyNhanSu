import React, { useEffect, useState } from "react";
import { getAllEmployee } from "../../../../services/EmployeeService";
import { getAllWorkPlace } from "../../../../services/WorkplaceService";
import { getAllDepartment } from "../../../../services/DepartmentService";
import { getAllAttendance } from "../../../../services/AttendanceService";
import { Row, Col } from "react-bootstrap";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MonthDatepicker from "../../../Common/MonthDatepicker/MonthDatepicker";
import "./DashboardStyle.scss";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [newEmployeesByWorkplace, setNewEmployeesByWorkplace] = useState([]);
  const [newEmployeesByDepartment, setNewEmployeesByDepartment] = useState([]);
  const [lateCount, setLateCount] = useState(0);
  const [earlyLeaveCount, setEarlyLeaveCount] = useState(0);
  const [totalNewEmployees, setTotalNewEmployees] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const getMonthString = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, "0")}`;
  };

  const fetchAllEmployees = async (page = 1, accumulated = []) => {
    const response = await getAllEmployee("", "", "", "", "", 0, page, 100);
    const newItems = response.value.items;
    const allItems = [...accumulated, ...newItems];

    if (response.value.hasNextPage) {
      return fetchAllEmployees(page + 1, allItems);
    }
    return allItems;
  };

  const fetchAllWorkplaceEmployees = async (
    workplaceId,
    page = 1,
    accumulated = []
  ) => {
    const response = await getAllEmployee(
      "",
      workplaceId,
      "",
      "",
      "",
      0,
      page,
      100
    );
    const newItems = response.value.items;
    const allItems = [...accumulated, ...newItems];

    if (response.value.hasNextPage) {
      return fetchAllWorkplaceEmployees(workplaceId, page + 1, allItems);
    }
    return allItems;
  };
  const fetchAllDepartments = async (page = 1, accumulated = []) => {
    const response = await getAllDepartment("", "", page, 100);
    const newItems = response.value.items;
    const allItems = [...accumulated, ...newItems];

    if (response.value.hasNextPage) {
      return fetchAllDepartments(page + 1, allItems);
    }
    return allItems;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const month = getMonthString(selectedMonth);
        let allEmployees = [];
        let page = 1;
        let hasMore = true;
        while (hasMore) {
          const response = await getAllEmployee(
            "",
            "",
            "",
            "",
            "",
            0,
            page,
            100
          );
          allEmployees = [...allEmployees, ...response.value.items];
          hasMore = response.value.hasNextPage;
          page++;
        }

        setTotalEmployees(allEmployees.length);
        // Get workplace data
        const workplaceRes = await getAllWorkPlace("", 1, 1000);
        const employeesByWorkplace = workplaceRes.value.items.map(
          (workplace) => {
            const count = allEmployees.filter(
              (employee) => employee.workPlace?.id === workplace.id
            ).length;
            return {
              name: workplace.name,
              totalEmployees: count,
            };
          }
        );
        setNewEmployeesByWorkplace(employeesByWorkplace);
        // Get department data
        const departmentRes = await getAllDepartment("", "", 1, 1000);
        const employeesByDepartment = departmentRes.value.items.map(
          (department) => ({
            name: department.name,
            totalEmployees: allEmployees.filter((employee) =>
              employee.employeeDepartments?.some(
                (empDept) =>
                  empDept.department.id === department.id &&
                  empDept.status === "Active"
              )
            ).length,
          })
        );
        setNewEmployeesByDepartment(employeesByDepartment);
        // Get attendance data
        let allAttendance = [];
        let attPage = 1;
        let attHasMore = true;
        while (attHasMore) {
          const attResponse = await getAllAttendance("", month, attPage, 100);
          allAttendance = [...allAttendance, ...attResponse.value.items];
          attHasMore = attResponse.value.hasNextPage;
          attPage++;
        }
        // Calculate attendance totals
        const { lateCount, earlyLeaveCount } = allAttendance.reduce(
          (acc, employee) => {
            if (employee.attendances?.length) {
              acc.lateCount += employee.attendances.filter(
                (att) => att.isLate
              ).length;
              acc.earlyLeaveCount += employee.attendances.filter(
                (att) => att.isEarlyLeave
              ).length;
            }
            return acc;
          },
          { lateCount: 0, earlyLeaveCount: 0 }
        );
        setLateCount(lateCount);
        setEarlyLeaveCount(earlyLeaveCount);
        const newEmployees = allEmployees.filter((employee) => {
          if (!employee.joinDate) return false;

          const joinDate = new Date(employee.joinDate);
          // Compare only month and year
          const isMatch =
            joinDate.getFullYear() === selectedMonth.getFullYear() &&
            joinDate.getMonth() === selectedMonth.getMonth();
          return isMatch;
        }).length;
        setTotalNewEmployees(newEmployees);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const workplaceData = newEmployeesByWorkplace.map((item) => ({
    name: item.name,
    "Tổng nhân viên": item.totalEmployees,
  }));

  const departmentData = newEmployeesByDepartment.map((item) => ({
    name: item.name,
    "Tổng nhân viên": item.totalEmployees,
  }));

  const attendanceData = [
    { name: "Đi muộn", value: lateCount },
    { name: "Về sớm", value: earlyLeaveCount },
  ];

  const handleDateChange = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className="dashboard-container">
      <Row className="mb-3 row-tool">
        <Col xs={6} md={3}>
          <MonthDatepicker value={selectedMonth} onChange={handleDateChange} />
        </Col>
      </Row>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Tổng số nhân viên</h3>
          <div className="summary-value">{totalEmployees}</div>
        </div>
        <div className="summary-card">
          <h3>Nhân viên mới</h3>
          <div className="summary-value">{totalNewEmployees}</div>
        </div>
        <div className="summary-card">
          <h3>Đi muộn</h3>
          <div className="summary-value">{lateCount}</div>
        </div>
        <div className="summary-card">
          <h3>Về sớm</h3>
          <div className="summary-value">{earlyLeaveCount}</div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-item">
          <h3>Phân bố nhân viên theo nơi làm việc</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workplaceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tổng nhân viên" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h3>Phân bố nhân viên theo phòng ban</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tổng nhân viên" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="dashboard-charts">
        <div className="chart-item">
          <h3>Thống kê đi muộn và về sớm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {attendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#FF8042" : "#00C49F"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
