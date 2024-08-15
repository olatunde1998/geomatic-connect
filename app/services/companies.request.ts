import axios from "axios";

// GET(READ) ALL COMPANY REQUEST
export const GetCompaniesRequest = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/companies`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
    },
  });
  const data = await response.data;
  return data;
};

// GET COMPANY BY ID REQUEST
export const GetCompanyByIdRequest = async (companyID :any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/companies/${companyID}`,
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

// CREATE NEW COMPANY REQUEST
export const CreateCompanyRequest = async (body: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/companies`, body, {
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






