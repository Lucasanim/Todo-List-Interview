import axios from "axios";
import { baseUrl } from "../baseUrl";

const instance = (token) =>
  axios.create({
    baseURL: baseUrl,
    // baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: { authorization: "Bearer " + token },
  });

export default instance;
