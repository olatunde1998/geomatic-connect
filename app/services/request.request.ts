import axios from "axios";

// GET(READ) REQUEST
export const GetAllNotifications = async (
  token: any,
  pageParam = 1,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests?pageNumber=${pageParam}&limit=${limit}`,
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

// GET(READ) ALL COMPANIES REQUEST
export const GetCompaniesRequest = async (token: string, state: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/companies?state=${state}`,
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
    // Log detailed error information for debugging
    console.error(
      `Error fetching companies in state ${state}:`,
      error.message || error
    );

    // Throw a custom error message
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch companies in state ${state}.`
    );
  }
};

// GET(READ) ALL STUDENTS REQUEST
export const GetStudentsRequest = async (token: any) => {
  try {
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
  } catch (error: any) {
    // Handle the error appropriately
    console.error("Error fetching students' requests:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch students' requests."
    );
  }
};

// GET USER BY ID REQUEST
export const GetUserByIdRequest = async (userId: any, token: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/users/${userId}`,
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
    console.error(
      `Error fetching user with ID ${userId}:`,
      error.message || error
    );
    throw new Error(
      error.response?.data?.message || `Failed to fetch user with ID ${userId}.`
    );
  }
};

//MAKE A REQUEST (Send request to Admin)
export const StudentSendRequestToAdmin = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/send-to-admin`,
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

//FORWARD A REQUEST (Forward request to Company)
export const AdminSendRequestToCompany = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/send-to-company`,
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

//APPROVED REQUEST BY COMPANY (Company approved a student request)
export const CompanyApproveStudentRequest = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/company-interest/approve`,
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

//APPROVED REQUEST BY ADMIN (Admin approved a student request)
export const AdminApproveStudentRequest = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/admin/approve`,
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

//DECLINED REQUEST BY COMPANY (Company declined a student request)
export const CompanyDeclineStudentRequest = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/company-interest/decline`,
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

//DECLINED REQUEST BY ADMIN (Admin declined a student request)
export const AdminDeclineStudentRequest = async (body: any, token: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/admin/decline`,
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

// GET STUDENTS BY COMPANY ID REQUEST
export const GetStudentsByCompanyRequest = async (
  companyId: any,
  token: any
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/company/${companyId}`,
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
    console.error(
      `Error fetching students for company with ID ${companyId}:`,
      error.message || error
    );
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch students for company with ID ${companyId}.`
    );
  }
};

// GET COMPANIES BY STUDENT ID REQUEST
export const GetCompaniesByStudentRequest = async (
  studentId: any,
  token: any
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/requests/student/${studentId}`,
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
    console.error(
      `Error fetching companies for student with ID ${studentId}:`,
      error.message || error
    );
    throw new Error(
      error.response?.data?.message ||
        `Failed to fetch companies for student with ID ${studentId}.`
    );
  }
};
