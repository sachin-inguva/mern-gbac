import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";

export function Logout() {
  const { signout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    signout(navigate("/login"));
  }, [signout, navigate]);

  return <div>logging out...</div>;
}
