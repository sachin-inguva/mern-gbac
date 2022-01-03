import React, { useState, useEffect } from "react";
import { axiosFetch } from "../api/axiosFetch";

import { signOut } from "../api/sign-out";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosFetch
      .get("/users/currentUser")
      .then((data) => setUser(data.data.user))
      .catch(setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signout = async (callback) => {
    await signOut();
    setUser(null);
    callback();
  };

  const value = { user, signout, setUser };

  if (loading) {
    return <div>loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
