import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';
function Header() {
    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand>Bootstrap Server</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to={`/dashboard`}>
                  <Nav.Link>
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
}

export default Header;