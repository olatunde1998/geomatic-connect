import axios from "axios";

// GET(READ) ALL COMPANIES REQUEST
export const GetCompaniesRequest = async (token: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users/companies`,
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

// GET(READ) ALL STUDENTS REQUEST
export const GetStudentsRequest = async (token: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users/students`,
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

// GET USER BY ID REQUEST
export const GetUserByIdRequest = async (userID: any, token: any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users/${userID}`,
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

//MAKE A REQUEST (Send request to Admin)
export const SendRequestToAdmin = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/request/send-to-admin`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// EDIT COMPANY REQUEST
export const EditCompanyRequest = async (editCompanyID: any, body: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/companies/${editCompanyID}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
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

// DELETE COMPANY  REQUEST
export const DeleteCompanyRequest = async (deleteCompanyID: any) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/companies/${deleteCompanyID}`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
      },
    }
  );
  const data = await response.data;
  return data;
};
