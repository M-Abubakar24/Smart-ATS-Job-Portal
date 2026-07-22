import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchNotifications();
    } catch (error) {
      alert("Failed to mark as read.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notification?")) return;

    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      alert("Failed to delete notification.");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Notifications...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-gray-500 text-xl">
              No notifications.
            </h2>
          </div>
        ) : (
          <div className="space-y-5">

            {notifications.map((notification) => (

              <div
                key={notification._id}
                className={`rounded-xl shadow p-6 ${
                  notification.isRead
                    ? "bg-white"
                    : "bg-blue-50 border-l-4 border-blue-600"
                }`}
              >

                <p className="text-lg">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-5">

                  {!notification.isRead && (
                    <button
                      onClick={() => handleRead(notification._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(notification._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Notifications;