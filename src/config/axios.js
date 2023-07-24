import axiosOriginal from "axios";

const axios = axiosOriginal.create({
  baseURL: "http://10.0.0.230:4000",
});


export default axios;