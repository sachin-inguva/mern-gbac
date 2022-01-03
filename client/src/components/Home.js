import React, { Fragment } from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import { Navbar } from "@blueprintjs/core";

import { useAuth } from "../context/auth-context";
import { ManageUsers } from "./ManageUsers";
import { Logout } from "./Logout";

export function Home() {
  const { user } = useAuth();

  return <div>Home</div>;
}
