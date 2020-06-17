import React from 'react';
import { Navbar, Nav, Button, Row } from 'react-bootstrap';
import './styles.css'
import rest from './index';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isAdmin: false
        };
        this.check()
    }

    async check() {
        await rest.checkLogin().then((r)=> this.setState(r));
        console.log(this.state)
    }

    render() {
        return (
            <div class='nav-container' >
                <Navbar role='navgation' bg="dark" variant="dark">
                    <Navbar.Brand href="/">Movie's Catalog</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/films">Films</Nav.Link>
                        <Nav.Link href="/actors">Actors</Nav.Link>
                        <Nav.Link href="/top">Top 100</Nav.Link>
                        {this.state.isLogin ? (
                            <Nav.Link href="/catalog">My catalog</Nav.Link>
                        ) : (
                                <div></div>
                            )}
                        {this.state.isAdmin ? (
                            <Button href="/admin">Admin Panel</Button>
                        ) : (
                                <div></div>
                            )}
                    </Nav>
                    <Nav>
                        {this.state.isLogin ? (
                            <Nav.Link href="/account">Account</Nav.Link>
                        ) : (
                            <Nav.Link href="/login">Login / Register</Nav.Link>
                            )}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
export default NavBar;