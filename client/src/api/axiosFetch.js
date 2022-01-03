import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
