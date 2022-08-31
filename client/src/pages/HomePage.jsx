import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function HomePage() {
  return (
    <Container>
      <Row className="justify-content-md-center my-3">
        <Col>
          <h1 style={{ textAlign: 'center' }}> Welcome to Bootstrap Server!</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
