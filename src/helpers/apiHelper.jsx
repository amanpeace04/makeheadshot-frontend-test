// utils/apiHelper.jsx
"use client";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const apiHelper = {
  get: async (url, config = {}) => {
    const token = localStorage.getItem("token");
    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };
    config.headers = { ...defaultHeaders, ...config.headers };

    const response = await axios.get(`${BASE_URL}${url}`, config);
    return response.data;
  },

  post: async (url, body, config = {}) => {
    const token = localStorage.getItem("token");
    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };

    // if not FormData, set JSON content-type
    if (!(body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json";
    }
    config.headers = { ...defaultHeaders, ...config.headers };

    const response = await axios.post(`${BASE_URL}${url}`, body, config);
    return response.data;
  },

  put: async (url, body, config = {}) => {
    const token = localStorage.getItem("token");
    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    config.headers = { ...defaultHeaders, ...config.headers };

    const response = await axios.put(`${BASE_URL}${url}`, body, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const token = localStorage.getItem("token");
    const defaultHeaders = { Authorization: `Bearer ${token}` };
    config.headers = { ...defaultHeaders, ...config.headers };

    const response = await axios.delete(`${BASE_URL}${url}`, config);
    return response.data;
  },
};

export default apiHelper;
