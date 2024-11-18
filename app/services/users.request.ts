import axios from "axios";

// GET(READ) ALL USERS REQUEST
export const GetUsersRequest = async (token: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users`,
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

// GET USER PROFILE REQUEST
export const GetUserProfileRequest = async (userID: any, token: any) => {
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

//

export const UpdateUserProfileRequest = async (
  userId: any,
  token: any,
  body: any
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/${userId}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
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
