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
    if (this.connection) {
      await this.connection.stop();
    }

    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5003/notificationHub", {
        accessTokenFactory: () => token,
      })
      .build();

    try {
      await this.connection.start();
      this.connection.on("ReceiveNotification", (message, title) => {

        if (title === "Đi trễ" || title === "Về sớm") {
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
