import React, { useState, useEffect } from "react";
import { Container, Button, Form, Tabs, Tab, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getEmployeeById,
  getEmployeeLogin,
} from "../../../../../services/EmployeeService";
import "./DetailEmployeeStyle.scss";
import UpdateEmployeeInfo from "../UpdateEmployee/UpdateEmployeeInfo/UpdateEmployeeInfo";
import PersionalInfomation from "./PersionalInfomation";
import WorkInformation from "./WorkInformation";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@mdi/react";
import { FaArrowLeft } from "react-icons/fa";
import {
  mdiBriefcaseVariantOutline,
  mdiHomeSwitchOutline,
  mdiTagHeartOutline,
  mdiEmailOutline,
  mdiSquareEditOutline,
  mdiCash,
  mdiAccountCancelOutline,
} from "@mdi/js";

const DetailEmployee = (props) => {
  const { showDetail, setShowDetail, dataUpdate } = props;
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const handleShowUpdateInfo = () => {
    setShowUpdateInfo(true);
  };
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        let res;
        if (!location.state?.employee?.id) {
          res = await getEmployeeLogin();
        } else {
          res = await getEmployeeById(location.state.employee.id);
        }

        if (res.isSuccess) {
          const employee = res.value;
          const filterActivePositions = employee.employeePositions.filter(
            (position) => position.status === "Active"
          );

          setEmployeeDetails({
            id: employee.id,
            maNv: employee.maNV,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            identityCard: employee.identityCard,
            gender: employee.gender === "Male" ? "Nam" : "Nữ",
            dateOfBirth: employee.dateOfBirth
              ? new Date(
                  new Date(employee.dateOfBirth).getTime() + 7 * 60 * 60 * 1000
                ).toLocaleDateString()
              : "",
            address: employee.address,
            joinDate: employee.joinDate
              ? new Date(employee.joinDate).toLocaleDateString()
              : "",
            bankName: employee.bankName,
            bankAccountNumber: employee.bankAccountNumber,
            department: employee.employeeDepartments?.[0]?.department?.name,
            position: filterActivePositions
              .map((position) => position.position?.name)
              .join(", "),
            salary: employee.salarys?.find((s) => s.status === "Active")
              ?.salarys,
            level: employee.employeeLevels?.[0]?.level?.name,
          });
        } else {
          toast.error("Không tìm thấy thông tin nhân viên");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải thông tin nhân viên");
      } finally {
        setLoading(false);
      }
    };

    loadEmployeeData();
  }, [location]);

  const handleClose = () => {
    navigate(-1);
  };
  const handleDetailEmployee = async (employeeId) => {
    try {
      const res = await getEmployeeById(employeeId);
      if (res.isSuccess) {
        const employee = res.value;
        const filterActivePositions = employee.employeePositions.filter(
          (position) => position.status === "Active"
        );
        setEmployeeDetails({
          id: employee.id,
          maNv: employee.maNV,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          identityCard: employee.identityCard,
          gender: employee.gender === "Male" ? "Nam" : "Nữ",
          dateOfBirth: employee.dateOfBirth
            ? new Date(employee.dateOfBirth).toLocaleDateString()
            : "",
          address: employee.address,
          joinDate: employee.joinDate
            ? new Date(employee.joinDate).toLocaleDateString()
            : "",
          bankName: employee.bankName,
          bankAccountNumber: employee.bankAccountNumber,
          department: employee.employeeDepartments?.[0]?.department?.name,
          position: filterActivePositions
            .map((position) => position.position?.name)
            .join(", "),

          salary: employee.salarys?.find((s) => s.status === "Active")?.salarys,

          level: employee.employeeLevels?.[0]?.level?.name,
        });
      } else {
        toast.error("Không tìm thấy thông tin nhân viên.");
      }
    } catch (error) {
      toast.error("Lỗi khi tải thông tin nhân viên.");
    }
  };
  const handleBack = () => {
    navigate("/user-dashboard");
  };
  return (
    <Container fluid className="detail-employee-container row">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft
          className="cursor-pointer me-2"
          style={{ fontSize: "20px" }}
          onClick={handleBack}
        />
        <h3 className="mb-0">Thông tin nhân viên</h3>
      </div>
      {/* khung avatar */}
      <div className="detail-employee-overview col-4">
        <div className="text-center">
          <img
            src="https://s3-sgn10.fptcloud.com/hrm/general/2024/02/21/male_1708481802690.png"
            className="header-profile-user rounded-circle"
          />
        </div>
        <h4>{employeeDetails.name}</h4>
        <div className="text-secondary"> {employeeDetails.position}</div>
        <hr />

        <div className="d-flex align-items-center">
          <Icon
            path={mdiTagHeartOutline}
            size={1}
            style={{
              marginRight: "8px",
              fontsize: "22px",
              alignItems: "middle",
              color: "#aaa",
            }}
            className="mr-3"
          />
          Mã nhân viên - {employeeDetails.maNv}
        </div>

        <div className="d-flex align-items-center mt-3">
          <Icon
            path={mdiEmailOutline}
            size={1}
            style={{
              marginRight: "8px",
              fontsize: "22px",
              alignItems: "middle",
              color: "#aaa",
            }}
            className="mr-3"
          />
          <span
            style={{
              wordBreak: "break-work",
            }}
          >
            {employeeDetails.email}
          </span>
        </div>

        {/* <div className="mt-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary w-100 mt-2"
          >
            <div className="d-flex align-items-center">
              <Icon
                path={mdiCash}
                size={1}
                style={{
                  marginRight: "8px",
                  fontsize: "17px",
                  alignItems: "middle",
                }}
                className="mr-1"
              />
              Thay đổi lương
            </div>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary w-100 mt-2"
          >
            <div className="d-flex align-items-center">
              <Icon
                path={mdiBriefcaseVariantOutline}
                size={1}
                style={{
                  marginRight: "8px",
                  fontsize: "17px",
                  alignItems: "middle",
                }}
                className="mr-1"
              />
              Thay đổi chức vụ
            </div>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary w-100 mt-2"
          >
            <div className="d-flex align-items-center">
              <Icon
                path={mdiHomeSwitchOutline}
                size={1}
                style={{
                  marginRight: "8px",
                  fontsize: "17px",
                  alignItems: "middle",
                }}
                className="mr-1"
              />
              Thay đổi nơi làm việc
            </div>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger w-100 mt-2"
          >
            <div className="d-flex align-items-center">
              <Icon
                path={mdiAccountCancelOutline}
                size={1}
                style={{
                  marginRight: "8px",
                  fontsize: "17px",
                  alignItems: "middle",
                }}
                className="mr-1"
              />
              Cho nghỉ việc
            </div>
          </button>
        </div> */}
      </div>

      {/* khung thông tin */}
      <div className="detail-employee-info col-8">
        <Tabs
          defaultActiveKey="tab-persional-info-employee"
          id="uncontrolled-tab-example"
          className="tab-detail-employee"
        >
          <Tab eventKey="tab-persional-info-employee" title="Cá nhân">
            {/* thông tin cá nhân */}
            <div className="row justify-content-between mr-2 mt-3">
              <h5 className="col-md-6">Thông tin cơ bản</h5>
              <Button
                variant="primary"
                className="update-button"
                onClick={handleShowUpdateInfo}
              >
                <Icon
                  path={mdiSquareEditOutline}
                  size={1}
                  style={{
                    marginRight: "5px",
                    fontsize: "5px",
                    alignItems: "middle",
                  }}
                  className="mr-1"
                />
                Cập nhật
              </Button>
            </div>
            <UpdateEmployeeInfo
              showUpdate={showUpdateInfo}
              setShowUpdate={setShowUpdateInfo}
              dataUpdate={employeeDetails}
              fetchListEmployee={handleDetailEmployee}
            />
            <PersionalInfomation employeeDetails={employeeDetails} />
          </Tab>
          <Tab eventKey="work-info" title="Công việc">
            {/* thông tin công việc */}
            <h5 className="mt-3">Thông tin công việc</h5>
            <WorkInformation employeeDetails={employeeDetails} />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default DetailEmployee;
