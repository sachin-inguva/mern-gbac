import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

import { axiosFetch } from "../api/axiosFetch";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axiosFetch.post("/signIn", {
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card style={{ margin: "auto 30%", padding: 20 }}>
      <Form.Label>Login</Form.Label>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button onClick={handleLogin} variant="primary">
          Login
        </Button>
      </Form>
    </Card>
  );
}
