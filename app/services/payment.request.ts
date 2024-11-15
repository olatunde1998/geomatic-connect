import axios from "axios";

// ACCEPT PAYMENT REQUEST
export const AcceptPaymentRequest = async (body: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/acceptpayment`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error, "this is error here====");
    throw error;
  }
};
