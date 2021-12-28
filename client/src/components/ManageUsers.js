import React from "react";
import { useQuery } from "react-query";
import { axiosFetch } from "../api/axiosFetch";

const getAllUsers = () => axiosFetch.get("/users");

export function ManageUsers() {
  const { isLoading, data, error } = useQuery("users", getAllUsers);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return <div>ManageUsers</div>;
}
