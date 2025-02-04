import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import "./WeekDatepickerStyle.scss";

const WeekDatepicker = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    if (!selectedWeek) {
      const today = new Date();
      const weekStart = getStartOfWeek(today);
      setSelectedWeek(weekStart);
      onChange?.(weekStart);
    }
  }, []);

  const getMonthYear = (date) => {
    const months = [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - (day === 0 ? 6 : day - 1);
    return new Date(d.setDate(diff));
  };

  const getWeekNumber = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const generateCalendarDays = useMemo(() => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    let startingDay = firstDay.getDay();
    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    const monthLength = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const prevMonthLength = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    const days = [];

    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          prevMonthLength - i
        )
      );
    }

    for (let i = 1; i <= monthLength; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
      );
    }

    return days;
  }, [currentDate]);

  const formatWeekDisplay = (date) => {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const weekNum = getWeekNumber(start);

    const startStr = start.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const endStr = end.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `Tuần ${weekNum} (${startStr} - ${endStr})`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
    );
  };

  const handleWeekClick = (date) => {
    const weekStart = getStartOfWeek(date);
    setSelectedWeek(weekStart);
    onChange?.(weekStart);
    setIsOpen(false);
  };

  const isCurrentDay = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedWeek = (date) => {
    if (!selectedWeek) return false;
    const weekToCheck = getStartOfWeek(date);
    return selectedWeek.toDateString() === weekToCheck.toDateString();
  };

  return (
    <div className="week-datepicker">
      <div className="calendar-input" onClick={() => setIsOpen(!isOpen)}>
        <div className="input-wrapper">
          <input
            type="text"
            readOnly
            placeholder="Chọn tuần"
            value={formatWeekDisplay(
              selectedWeek || getStartOfWeek(new Date())
            )}
          />
          <i className="calendar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              width="1em"
              height="1em"
            >
              <path d="M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"></path>
            </svg>
          </i>
        </div>
      </div>

      {isOpen && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <div className="nav-buttons">
              <button
                className="nav-btn"
                onClick={handlePrevYear}
                title="Previous Year"
              >
                <ChevronsLeft size={18} />
              </button>
              <button
                className="nav-btn"
                onClick={handlePrevMonth}
                title="Previous Month"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <div className="month-display">{getMonthYear(currentDate)}</div>
            <div className="nav-buttons">
              <button
                className="nav-btn"
                onClick={handleNextMonth}
                title="Next Month"
              >
                <ChevronRight size={18} />
              </button>
              <button
                className="nav-btn"
                onClick={handleNextYear}
                title="Next Year"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}

            {generateCalendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              return (
                <div
                  key={index}
                  onClick={() => handleWeekClick(date)}
                  className={`calendar-day ${
                    !isCurrentMonth ? "different-month" : ""
                  } ${isCurrentDay(date) ? "today" : ""} ${
                    isSelectedWeek(date) ? "selected-week" : ""
                  }`}
                >
                  <span className="date-number">{date.getDate()}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekDatepicker;
