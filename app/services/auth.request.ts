import axios from "axios";

// CREATE NEW USER REQUEST (REGISTER USER)
export const RegisterUserRequest = async (body: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/auth/register`, body, {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log(data, "data is here");
      if (!data) return;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // REGISTER WITH GOOGLE (SIGN UP)
export const RegisterWithGoogleRequest = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/auth/google`, {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
      },
    });
    const data = await response.data;
    return data;
  };