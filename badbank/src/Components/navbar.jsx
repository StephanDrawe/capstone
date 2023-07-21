import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import React, { useContext } from "react"
import { UserContext } from "./Context"

export function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
            <Nav.Link as={Link} to="/withdraw">Withdraw</Nav.Link>
            <Nav.Link as={Link} to="/Transfer">Transfer</Nav.Link>
            <Nav.Link as={Link} to="/balance">Balance</Nav.Link>
            <Nav.Link as={Link} to="/allData">All Data</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <h6>{user?.username || ""}</h6>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

