import React, { useContext } from 'react';
import { useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import AuthContext from '../contexts/AuthContext';
import { getConnectionDetail, login, signUp } from '../services/api';

function LoginPage() {
  const { setCurrentUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (showLogin) {
      try {
        const user = await login(username, password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          setCurrentUser(user);
          setIsLoading(false);
          const connection = await getConnectionDetail(user.Client_Id);
          if (
            connection.Client_Id &&
            new Date(connection.expireAt).getTime() - Date.now() > 0
          ) {
            localStorage.setItem(
              'license',
              JSON.stringify({
                licenseKey: connection.License_Key,
                expireAt: connection.expireAt,
              }))
          }
         
          navigate('/dashboard');
        }
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    } else {
      try {
        const user = await signUp(username, password);
        if (user) {
          setCurrentUser(user);
          setIsLoading(false);
          localStorage.setItem('currentUser', JSON.stringify(user));
          navigate('/dashboard');
        }
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={4} md={6} xs={12}>
          {showLogin ? <h1>Login</h1> : <h1>Register</h1>}
          {error && <Alert variant="danger">{error}</Alert>}
          {isLoading && <Loader />}
          <Form onSubmit={handleLogin}>
            <FormGroup controlId="username" className="mb-2">
              <FormLabel>Username</FormLabel>
              <FormControl
                type="username"
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
                <Button
                  variant="link"
                  onClick={() => {
                    setShowLogin(false);
                    setError('');
                  }}
                >
                  Register here
                </Button>
              </Col>
            ) : (
              <Col>
                Already have an account?
                <Button
                  variant="link"
                  onClick={() => {
                    setShowLogin(true);
                    setError('');
                  }}
                >
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
