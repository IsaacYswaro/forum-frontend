import axios from "axios";

const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default axiosBase;
