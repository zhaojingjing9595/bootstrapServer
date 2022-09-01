import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function AlertModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Alert!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your license key has expired!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertModal;
