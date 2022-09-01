import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function Header() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  const handleLogout = () => { 
    setCurrentUser(null);
    localStorage.removeItem('currentUser')
  }
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
                {currentUser ? (
                  <>
                    <LinkContainer to={`/dashboard`}>
                      <Nav.Link>
                        <i className="fas fa-table"></i> Dashboard
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={'/'}>
                      <Nav.Link onClick={handleLogout}>
                        <i className="fas fa-sign-out"></i> Logout
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to={'/login'}>
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
}

export default Header;