import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    Accept: "application/json",
  },
});
