import React, { useState, useRef, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import { FaBell, FaExclamationCircle } from "react-icons/fa";
import { MdOutlineCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./NotificationDropdownStyle.scss";

const NotificationDropdown = (props) => {
  const { Notification, IsRead, fetchNotifications } = props;
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerLoad = 10;

  useEffect(() => {
    if (fetchNotifications) {
      fetchNotifications();
    }
    const interval = setInterval(() => {
      if (fetchNotifications) {
        fetchNotifications();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (Notification && Notification.length > 0) {
      const initialNotifications = Notification.slice(0, itemsPerLoad);
      setDisplayedNotifications(initialNotifications);
      setHasMore(Notification.length > itemsPerLoad);
    } else {
      setDisplayedNotifications([]);
      setHasMore(false);
    }
  }, [Notification]);

  const loadMoreNotifications = () => {
    if (!Notification || !displayedNotifications) return;

    const currentLength = displayedNotifications.length;
    const nextItems = Notification.slice(
      currentLength,
      currentLength + itemsPerLoad
    );

    if (nextItems.length > 0) {
      setDisplayedNotifications((prev) => [...prev, ...nextItems]);
    }

    setHasMore(currentLength + nextItems.length < Notification.length);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown && displayedNotifications.length === 0) {
      const initialNotifications = Notification.slice(0, itemsPerLoad);
      setDisplayedNotifications(initialNotifications);
      setHasMore(Notification.length > itemsPerLoad);
    }
  };

  const handleNotificationClick = (url) => {
    navigate(url);
    setShowDropdown(false);
  };

  const unreadCount = useMemo(() => {
    return Notification.filter((notification) => !notification.isRead).length;
  }, [Notification]);

  return (
    <div
      className="position-relative"
      style={{ margin: "10px" }}
      ref={dropdownRef}
    >
      <NavLink to="#" onClick={toggleDropdown} className="nav-link">
        <FaBell style={{ color: "white", fontSize: "1em" }} />
        {unreadCount > 0 && (
          <span className="badge bg-danger rounded-pill">{unreadCount}</span>
        )}
      </NavLink>

      {showDropdown && (
        <div className="dropdown-menu show custom-notification-dropdown">
          <h6 className="dropdown-header text-primary">Thông báo</h6>

          <InfiniteScroll
            dataLength={displayedNotifications.length}
            next={loadMoreNotifications}
            hasMore={hasMore}
            loader={<div className="text-center p-2">Đang tải...</div>}
            scrollableTarget="notification-container"
            height={Notification.length < 8 ? "auto" : "520px"}
          >
            <div className="notification-list">
              {displayedNotifications.length > 0 ? (
                displayedNotifications.map((noti, index) => (
                  <div
                    key={index}
                    className={`notification-item ${
                      !noti.isRead ? "unread" : ""
                    }`}
                    onClick={() => {
                      handleNotificationClick(noti.url);
                      IsRead(noti.id);
                    }}
                  >
                    <div className="icon">
                      {noti.type === "warning" ? (
                        <FaExclamationCircle className="warning-icon" />
                      ) : (
                        <MdOutlineCheckCircle className="success-icon" />
                      )}
                    </div>
                    <div className="content">
                      <h6 className="title">{noti.title}</h6>
                      <p className="message">{noti.message}</p>
                      <small className="time">
                        {new Date(noti.createdAt).toLocaleString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center m-2">Không có thông báo</p>
              )}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
