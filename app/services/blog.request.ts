import axios from "axios";

// CREATE NEW BLOG REQUEST
export const CreateBlogRequest = async (body: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/blogs`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
        },
      }
    );
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error, "error occured in blogrequest====");
    throw error;
  }
};

// GET(READ) BLOGS
export const GetBlogsRequest = async (pageNumber = 1, limit: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/blogs`,
      {
        maxBodyLength: Infinity,
        params: { pageNumber, limit },
        headers: {
          Accept: "application/vnd.connect.v1+json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

// GET BLOG  REQUEST
export const GetBlogRequest = async (blogSlug: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/blogs/${blogSlug}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

// UPDATE BLOG
export const UpdateBlogRequest = async (blogId: any, token: any, body: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/blogs/${blogId}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
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

// DELETE  BLOG  REQUEST
export const DeleteBlogRequest = async (blogId: any, token: any) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/blogs/${blogId}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
