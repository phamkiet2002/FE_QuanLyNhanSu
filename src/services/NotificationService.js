import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";

class NotificationService {
  constructor() {
    this.connection = null;
  }
  connect = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No JWT token.");
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5003/notificationHub", {
        accessTokenFactory: () => token,
      })
      .build();

    try {
      console.log("Connecting to the notification hub...");

      await this.connection.start();
      this.connection.on("ReceiveNotificationForUser", (message, title) => {
        if (title === "Quản lý từ chối chấm công của bạn" || title === "Quản lý từ chối bạn nghỉ phép") {
          toast.warning(message);
        }
        else {
          toast.success(message);
        }
      });
    } catch (error) {
      console.error("SignalR connection error:", error);
    }
  };

  disconnect = async () => {
    if (this.connection) {
      await this.connection.stop();
    }
  };
}

export default new NotificationService();
