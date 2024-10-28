import axios from "axios";
const instance = axios.create({
  baseURL: "https://hisabrakhobackend.onrender.com",
  // baseURL: "http://localhost:80",
});

export default instance;
