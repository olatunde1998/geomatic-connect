import axios from "axios";

// GET(READ) ALL USERS REQUEST
export const GetUsersRequest = async (
  token: string,
  pageNumber = 1,
  limit: number,
  search: string
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users`,
    {
      maxBodyLength: Infinity,
      params: { pageNumber, limit, search },
      headers: {
        Accept: "application/vnd.connect.v1+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

// GET USER PROFILE REQUEST
export const GetUserProfileRequest = async (userID: string, token: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users/profile/${userID}`,
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
};

// UPDATE USER PROFILE

export const UpdateUserProfileRequest = async (
  userId: string,
  token: string,
  body: any
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/${userId}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "multipart/form-data",
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

// DELETE USER REQUEST
export const DeleteUserRequest = async (userId: string, token: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/${userId}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
