import React, { useState, useEffect } from "react";
import "./StandardWorkingStyle.scss";
import {
  getStandardWorkingDay,
  updateStandardWorkingDay,
} from "../../../../../services/StandardWorkingService";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";

const StandardWorking = () => {
  const { user } = useAuth();

  const roleAccess = {
    view: ["ADMIN"],
    update: ["ADMIN"],
  };

  const hasPermision = (feature) => {
    if (!user?.roles || !roleAccess[feature]) return false;
    return roleAccess[feature].some((role) => user.roles.includes(role));
  };

  const [standardWorkingDays, setStandardWorkingDays] = useState([]);

  useEffect(() => {
    const fetchStandardWorkingDays = async () => {
      try {
        const response = await getStandardWorkingDay();
        if (response.isSuccess) {
          setStandardWorkingDays(response.value);
        } else {
          console.error("Error fetching data:", response.error.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (hasPermision("view")) {
      fetchStandardWorkingDays();
    }
  }, [user]);

  const handleInputChange = (month, value) => {
    setStandardWorkingDays((prevData) =>
      prevData.map((item) =>
        item.month === month ? { ...item, standardWorkingDay: value } : item
      )
    );
  };

  const handleSaveConfig = async () => {
    if (!hasPermision("update")) {
      toast.error("Bạn không có quyền cập nhật cấu hình.");
      return;
    }

    try {
      const data = {
        updates: standardWorkingDays.map((item) => ({
          month: item.month,
          standardWorkingDay: item.standardWorkingDay,
        })),
      };

      const response = await updateStandardWorkingDay(data);
      if (response.isSuccess) {
        toast.success("Cập nhật thành công!");
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật.");
        console.error("Update error:", response.error.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật.");
      console.error("Update error:", error);
    }
  };

  if (!hasPermision("view")) {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="container-fluid standard-working-container">
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-1">
            <div className="card-body">
              <div className="mt-0">
                <div className="row input-row">
                  {standardWorkingDays.map((item) => (
                    <div className="col-6" key={item.month}>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <label className="input-group-text mw89">
                              Tháng {item.month}
                            </label>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            value={item.standardWorkingDay || ""}
                            onChange={(e) =>
                              handleInputChange(item.month, e.target.value)
                            }
                          />
                          <div className="input-group-append">
                            <label
                              id="pop-suggets-month-1"
                              className="input-group-text text-primary"
                            >
                              <span>Công</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveConfig}
                  >
                    Lưu cấu hình
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardWorking;
