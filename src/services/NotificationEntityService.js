import axiosCustomize from "../Utils/axiosCustomize";

const END_POINT = {
  NOTIFICATION: "Notification",
};

const getNotification = () => {
  return axiosCustomize
    .get(`${END_POINT.NOTIFICATION}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      // Filter notifications where typePage is true
      if (response.value) {
        response.value = response.value.filter(
          (notification) => notification.typePage === false
        );
      }
      return response;
    });
};

const IsReadNotification = (id) => {
  return axiosCustomize.put(`${END_POINT.NOTIFICATION}/${id}`);
};

export { getNotification, IsReadNotification };
