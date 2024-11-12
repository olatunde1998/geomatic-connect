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
