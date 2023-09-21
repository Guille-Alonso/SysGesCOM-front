import axios from "axios";

export const axiosGiphy = axios.create({
  baseURL:"https://api.giphy.com/v2"
})

export const axiosGiphySearch = axios.create({
  baseURL:"https://api.giphy.com/v1"
})