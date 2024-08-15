import axios from "axios";

// GET(READ) ALL STUDENTS REQUEST
export const GetStudentsRequest = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/students`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
    },
  });
  const data = await response.data;
  return data;
};

// GET STUDENT BY ID REQUEST
export const GetStudentByIdRequest = async (studentID :any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/students/${studentID}`,
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

// CREATE NEW STUDENT REQUEST
export const CreateStudentRequest = async (body: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/students`, body, {
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

// EDIT STUDENT REQUEST
export const EditStudentRequest = async (editStudentID: any, body: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/students/${editStudentID}`,
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

// DELETE STUDENT  REQUEST
export const DeleteStudentRequest = async (deleteStudentID: any) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/students/${deleteStudentID}`,
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






