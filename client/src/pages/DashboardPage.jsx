import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import { ConnectToServer, getConnectionDetail } from '../services/api';

function DashboardPage() {
    const {currentUser} = useContext(AuthContext)
  const [licenseKey, setLicenseKey] = useState('');
  const [location, setLocation] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState(null);
    const [ clock, setClock ] = useState();
    
  const handleConnectToServer = async (e) => {
    e.preventDefault();
    const connectionRequestObj = {
      Client_Id: currentUser.Client_Id,
      Client_Password: currentUser.Client_Password,
      License_Key: licenseKey,
      Location: location,
    };
    const newConnection = await ConnectToServer(connectionRequestObj);
    console.log(newConnection);
    if (newConnection) {
        setConnectionDetails(newConnection);
        setClock(newConnection.License_Expiration_Time*60);
      setShowMessage(true);
    }
  };
    
    useEffect(() => { 
        const fetchConnectionDetail = async (_id) => { 
            const connection = await getConnectionDetail(_id);
            if (connection) {
              setConnectionDetails(connection);
            }
        }
        const interval = setInterval(
            () => {
                if (connectionDetails) { 
                    fetchConnectionDetail(connectionDetails._id);
                    setClock((prev)=>prev-3)
                }
            },
          3000
        );

        if (clock === 0) { 
            console.log('cleaning up')
            clearInterval(interval);
        }

        return function cleanup() { 
            clearInterval(interval);
        }
    },[clock])
    

    
  return (
      <div>
          {clock && <h1>{clock}</h1>}
      {currentUser && !showMessage && (
        <Row className="justify-content-md-center my-3">
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
                <Col md={6} style={{ textAlign: 'center' }}>
                  <Button type="submit">Connect to server</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
      {showMessage && (
        <Row className="justify-content-md-center my-3">
          <Col lg={6} md={10} xs={12}>
            <Alert variant="success">Connecting to server successfully!</Alert>
          </Col>
        </Row>
      )}
      {connectionDetails && (
        <>
          <Row className="justify-content-center my-3">
            <Col lg={10} xs={12}>
              <h3>Server connection details:</h3>
            </Col>
          </Row>
          <Row className="justify-content-center my-3">
            <Col lg={10} xs={12}>
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th>Client_Id</th>
                    <th>License_Key</th>
                    <th>License_Expiration_Time(Mins)</th>
                    <th>Server_Id</th>
                    <th>Clients_Capacity</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{connectionDetails.Client_Id}</td>
                    <td>{connectionDetails.License_Key}</td>
                    <td>{connectionDetails.License_Expiration_Time}</td>
                    <td>{connectionDetails.Server_Id}</td>
                    <td>{connectionDetails.Client_Capacity}</td>
                    <td>{connectionDetails.Location}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
