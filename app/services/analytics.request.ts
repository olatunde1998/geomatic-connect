import axios from "axios";

// GET(READ) ALL ANALYTICS REQUEST
export const GetStudentAnalyticsRequest = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/analytics/student`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error; 
  }
};
