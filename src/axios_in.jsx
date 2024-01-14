import axios from 'axios';
const instance = axios.create({
    baseURL: "https://hisabrakhobackend.onrender.com"
    // baseURL:""
  });
  
  export default instance;