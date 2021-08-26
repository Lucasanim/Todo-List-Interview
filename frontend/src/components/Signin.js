import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";

import { login } from "../redux/user/user.actions";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Title>Log In</Card.Title>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form.Group>

        <Form.Group className="d-flex justify-content-center">
          <LinkContainer to="/signup">
            <Button variant="link" type="submit">
              Create An Account
            </Button>
          </LinkContainer>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default Signin;
