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
import AlertModal from '../components/AlertModal';
import AuthContext from '../contexts/AuthContext';
import { ConnectToServer, getConnectionDetail } from '../services/api';

function DashboardPage() {
  const { currentUser } = useContext(AuthContext);
  const [licenseKey, setLicenseKey] = useState('');
  const [location, setLocation] = useState('');
  const [connectionDetails, setConnectionDetails] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [error, setError] = useState('');
  const [clock, setClock] = useState(
    localStorage.license
      ? Math.floor(
          ((new Date(JSON.parse(localStorage.license).expireAt)).getTime() -
            Date.now()) /
            1000
        )
      : null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        localStorage.license &&
        new Date(JSON.parse(localStorage.license).expireAt).getTime() -
          Date.now() >=
          0
      ) {
        setClock((prev) => prev - 1);
        fetchConnectionDetail(JSON.parse(localStorage.currentUser).Client_Id);
      }
    }, 1000);

    if (clock === 0) {
      clearInterval(interval);
      setShowAlertModal(true);
      setConnectionDetails(null);
      setLicenseKey('');
      setLocation('');
      localStorage.removeItem('license')
    }

    return function cleanup() {
      clearInterval(interval);
    };
  }, [clock]);

  // refresh onMount:
  useEffect(() => {
    if (localStorage.currentUser && localStorage.license &&
        new Date(JSON.parse(localStorage.license).expireAt).getTime() -
          Date.now() >0 ) {
      fetchConnectionDetail(JSON.parse(localStorage.currentUser).Client_Id);
    }
  }, []);

  const fetchConnectionDetail = async (Client_Id) => {
    const connection = await getConnectionDetail(Client_Id);
    if (connection.Client_Id) {
      setConnectionDetails(connection);
    } else {
      setConnectionDetails(null);
    }
  };

  const handleConnectToServer = async (e) => {
    e.preventDefault();
    const connectionRequestObj = {
      Client_Id: currentUser.Client_Id,
      Client_Password: currentUser.Client_Password,
      License_Key: licenseKey,
      Location: location,
    };
    try {
      const newConnection = await ConnectToServer(connectionRequestObj);
      if (newConnection) {
        setConnectionDetails(newConnection);
        localStorage.setItem(
          'license',
          JSON.stringify({
            licenseKey: newConnection.License_Key,
            expireAt: newConnection.expireAt,
          })
          );
          setClock(
            Math.floor(
              (new Date(newConnection.expireAt).getTime() -
                Date.now()) /
                1000
            )
          );
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // console.log(clock);
  // console.log(connectionDetails);
  
  
  
  return (
    <div>
      {currentUser && !clock && (
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
              {error && <Alert variant="danger">{error}</Alert>}
            </Form>
          </Col>
        </Row>
      )}

      {showAlertModal && (
        <AlertModal
          show={showAlertModal}
          onHide={() => { setShowAlertModal(false);  localStorage.removeItem('license')}}
        />
      )}

      { connectionDetails && clock!==0 && clock!==null && (
        <>
          <Row className="justify-content-md-center my-3">
            <Col lg={6} md={10} xs={12}>
              <Alert variant="success">
                Connecting to server successfully!
              </Alert>
            </Col>
          </Row>

          <Row className="justify-content-center my-3">
            <Col lg={10} xs={12}>
              <h3 style={{ textAlign: 'center' }}>
                Expires after:{' '}
                {new Date(clock * 1000).toISOString().substr(11, 8)}
              </h3>
            </Col>
          </Row>
          <Row className="justify-content-center my-3">
            <Col lg={10} xs={12}>
              <h5>Server connection details:</h5>
            </Col>
          </Row>
          <Row className="justify-content-center my-3">
            <Col lg={10} xs={12}>
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th>Client_Id</th>
                    <th>License_Key</th>
                    <th>Expiration_Time(min)</th>
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
