import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom';

function MyNavbar(){
    return (
        <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/inventory">Inventories</Nav.Link>
              <Nav.Link as={Link} to="/headers">Headers</Nav.Link>
              <Nav.Link as={Link} to="/Items">Items</Nav.Link>
              <Nav.Link as={Link} to="/Branches">Branches</Nav.Link>
              <Nav.Link as={Link} to="/Packages">Packages</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default MyNavbar;