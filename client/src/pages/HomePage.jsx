import React, { useState } from 'react';
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
import { ConnectToServer } from '../services/api';

function HomePage({currentUser}) {
  const [licenseKey, setLicenseKey] = useState('');
  const [location, setLocation] = useState('');

  const handleConnectToServer = async(e) => {
      e.preventDefault();
      const connectionRequestObj = {
          Client_Id: currentUser.Client_Id,
          Client_Password: currentUser.Client_Password,
          License_Key: licenseKey,
          Location: location
      }
      const response = await ConnectToServer(connectionRequestObj);
      console.log(response)
      
  };
  return (
    <Container>
      <Row className="justify-content-md-center my-3">
        <Col>
          <h1 style={{ textAlign: 'center' }}> Welcome to Bootstrap Server!</h1>
        </Col>
      </Row>

      { currentUser && <Row className="justify-content-md-center my-3">
        <Col lg={6} md={10} xs={12}>
          <Form onSubmit={handleConnectToServer}>
            <Row>
              <Col>
                <FormGroup controlId="license-key" className="mb-2">
                  <FormLabel>License Key</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter License key"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                  ></FormControl>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="location" className="mb-2">
                  <FormLabel>Location</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row className="px-3 my-3 justify-content-center">
              <Col md={6} style={{textAlign:"center"}}>
                <Button  type="submit">
                  Connect to server
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>}
    </Container>
  );
}

export default HomePage;
