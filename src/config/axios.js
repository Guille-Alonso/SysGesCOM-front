import axiosOriginal from "axios";

const axios = axiosOriginal.create({
  // baseURL: "http://localhost:4000", // IP Local

  baseURL: "http://10.5.0.206:4000", // IP del Pinguero

  // baseURL: "http://10.0.0.230:4000", // IP Original
});


export default axios;