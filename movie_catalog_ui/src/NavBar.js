import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './styles.css'

class NavBar extends React.Component {

    render() {
        return (
            <div class='nav-container' >
                <Navbar role='navgation' bg="dark" variant="dark">
                    <Navbar.Brand href="/">Movie's Catalog</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/films">Films</Nav.Link>
                        <Nav.Link href="/top">Top 100</Nav.Link>
                        <Nav.Link href="/catalog">My catalog</Nav.Link>
                        <Button href="/admin">Admin Panel</Button>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
export default NavBar;