import { useRef, useEffect } from "react";
import NotificationService from "../../../../services/NotificationService";

const NotificationComponent = () => {
  const isConnectedRef = useRef(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && !isConnectedRef.current) {
      NotificationService.connect();
      isConnectedRef.current = true;
    } else {
      console.error("No JWT token.");
    }
    return () => {
      NotificationService.disconnect();
      isConnectedRef.current = false;
    };
  }, []);

  return null;
};

export default NotificationComponent;
