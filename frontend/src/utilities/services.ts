import axios from "axios";
import { GridValidRowModel } from "@mui/x-data-grid";
const url = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${url}/users/refreshtoken`,
          {},
          {
            withCredentials: true,
          }
        );
        return axios(originalRequest);
      } catch (refreshError) {}
    }

    return Promise.reject(error);
  }
);

export const loginAsync = async (newuser: any) => {
  try {
    const response: any = await axios.post(`${url}/users/login`, newuser, {
      withCredentials: true,
    });
    console.log("response", response);

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const addUsersAsync = async (data: any) => {
  try {
    const newuser = {
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      phoneId: data.user.phoneId,
      whatsappToken: data.user.whatsappToken,
      verifyToken: data.user.verifyToken,
    };
    const response = await axiosInstance.post(
      `${url}/users/email/${data.socketId}`,
      newuser,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const asyncAuthenticateUser = async () => {
  try {
    const temp = {
      token: "token",
    };
    const response = await axiosInstance.post(`${url}/users/verify`, temp, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUsersAsync = async (data: any) => {
  try {
    const body = {
      token: data.token,
      password: data.password,
      whatsappToken: data.whatsappToken,
    };
    const response = await axios.post(`${url}/users/signup`, body, {});
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUsersAsync = async (data: any) => {
  try {
    const response = await axios.post(`${url}/users/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutAsync = async () => {
  try {
    const response = await axiosInstance.post(
      `${url}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// for template

export const getTemplateByUserIdAsync = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${url}/template`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const savetemplateAsync = async (data: any) => {
  try {
    const response = await axiosInstance.put(
      `${url}/templates/update/${data.socketId}`,
      data.template,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserMobileNumbersAsync = async () => {
  try {
    const response = await axiosInstance.get(`${url}/phone`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSettingsAsync = async (data: any) => {
  try {
    const body = {
      tel: data.tel,
      phoneId: data.phoneId,
      verifyToken: data.verifyToken,
      whatsappToken: data.whatsappToken,
      phoneNumbers: data.phoneNumbers,
    };
    const response = await axiosInstance.post(
      `${url}/user/update/${data.socketId}`,
      body,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
