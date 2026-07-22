import API from "../api/axios";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get notifications
export const getNotifications = async () => {
  const response = await API.get(
    "/notifications",
    getToken()
  );

  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (id) => {
  const response = await API.put(
    `/notifications/${id}/read`,
    {},
    getToken()
  );

  return response.data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const response = await API.delete(
    `/notifications/${id}`,
    getToken()
  );

  return response.data;
};