import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./MonthDatepickerStyle.scss";

const MonthDatepicker = (props) => {
  const { value, onChange } = props;
  const [currentYear, setCurrentYear] = useState(
    value ? value.getFullYear() : new Date().getFullYear()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(value || new Date());

  useEffect(() => {
    if (value) {
      setCurrentYear(value.getFullYear());
      setSelectedMonth(value);
    }
  }, [value]);

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const handleMonthClick = (monthIndex) => {
    const selectedDate = new Date(currentYear, monthIndex);
    setSelectedMonth(selectedDate);
    onChange?.(selectedDate);
    setIsOpen(false);
  };
  const formatMonthDisplay = (date) => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="month-datepicker">
      <div className="calendar-input" onClick={() => setIsOpen(!isOpen)}>
        <div className="input-wrapper">
          <input
            type="text"
            readOnly
            placeholder="Chọn tháng"
            value={formatMonthDisplay(selectedMonth)}
          />
          <i className="calendar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path
                fill="currentColor"
                d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A2,2,0,0,0,3,6V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6A2,2,0,0,0,19,4Zm0,16H5V10H19ZM19,8H5V6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2Z"
              />
            </svg>
          </i>
        </div>
      </div>

      {isOpen && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button className="nav-btn" onClick={handlePrevYear}>
              <ChevronLeft size={18} />
            </button>
            <div className="year-display">{currentYear}</div>
            <button className="nav-btn" onClick={handleNextYear}>
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="calendar-grid">
            {months.map((month, index) => (
              <div
                key={index}
                className={`calendar-month ${
                  selectedMonth.getFullYear() === currentYear &&
                  selectedMonth.getMonth() === index
                    ? "selected-month"
                    : ""
                }`}
                onClick={() => handleMonthClick(index)}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthDatepicker;
