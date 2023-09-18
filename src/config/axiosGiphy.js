import axios from "axios";

export const axiosGiphy = axios.create({
  baseURL:"https://api.giphy.com/v2"
})
