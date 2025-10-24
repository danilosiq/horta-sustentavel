import axios from "axios";

export const api = axios.create({
  baseURL: 'https://hortashost.vercel.app/api'
})