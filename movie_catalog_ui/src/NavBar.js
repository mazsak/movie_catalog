import React from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

class NavBar extends React.Component {
    renser() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Movie's Catalog</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Films</Nav.Link>
                    <Nav.Link href="#features">Top 100</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#pricing">Login</Nav.Link>
                    <Nav.Link href="#pricing">Register</Nav.Link>
                    <Nav.Link href="#pricing">Account</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}
export default NavBar;