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

// VERIFY PAYMENT
export const VerifyPaymentRequest = async (
  reference: any,
  subscriptionPlan: any
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/verifypayment/${reference}?subscriptionPlan=${subscriptionPlan}`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
};


// GET ALL SUBSCRIPTIONS
export const GetAllSubscriptions = async (
  pageParam = 1,
  limit: number,
  token: any
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/subscription?pageNumber=${pageParam}&limit=${limit}`,
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
