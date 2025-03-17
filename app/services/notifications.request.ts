import axios from "axios";

// GET(READ) USER NOTIFICATIONS
export const GetUserNotifications = async (
  token: any,
  pageParam = 1,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/notifications/user-notifications?pageNumber=${pageParam}&limit=${limit}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    // Handle the error appropriately
    console.error("Error fetching notifications:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch notifications."
    );
  }
};

// UPDATE USER NOTIFICATIONS
export const UpdateUserNotificationRequest = async (
  notificationId: any,
  token: any,
  body: any
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/notifications/${notificationId}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE USER NOTIFICATION  REQUEST
export const DeleteNotificationRequest = async (notificationId: any, token: any) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/notifications/${notificationId}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user request:", error);
    throw error;
  }
};
