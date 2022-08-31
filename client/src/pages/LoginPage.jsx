import React from 'react';
import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { login, signUp } from '../services/api';

function LoginPage({ currentUser, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (showLogin) {
      try {
        const user = await login(username, password);
        user && setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const user = await signUp(username, password);
        user && setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={4} md={6} xs={12}>
          {showLogin ? <h1>Login</h1> : <h1>Register</h1>}
          <Form onSubmit={handleLogin}>
            <FormGroup controlId="username" className="mb-2">
              <FormLabel>Username</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="password" className="mb-2">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>

            {showLogin ? (
              <Button className="my-2" type="submit">
                Sign In
              </Button>
            ) : (
              <Button className="my-2" type="submit">
                Register
              </Button>
            )}
          </Form>
          <Row>
            {showLogin ? (
              <Col>
                New Customer?
                <Button variant="link" onClick={() => setShowLogin(false)}>
                  Register here
                </Button>
              </Col>
            ) : (
              <Col>
                Already have an account?
                <Button variant="link" onClick={() => setShowLogin(true)}>
                  Login here
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
