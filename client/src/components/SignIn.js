import React, { useState } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { useNavigate } from "react-router";

import { axiosFetch } from "../api/axiosFetch";
import { useAuth } from "../context/auth-context";

export function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axiosFetch.post("/signIn", {
        username,
        password,
      });
      setUser(data.user);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card style={{ margin: "auto 30%", padding: 20 }}>
      <h2>Login</h2>
      <FormGroup label="Username">
        <InputGroup
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          type="text"
          placeholder="Enter username"
        />
      </FormGroup>
      <FormGroup label="Password">
        <InputGroup
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="Password"
        />
      </FormGroup>

      <Button large onClick={handleLogin} intent="primary" text="Login" />
    </Card>
  );
}
