import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-backend-6hkj.onrender.com",
});

export default axiosBase;
