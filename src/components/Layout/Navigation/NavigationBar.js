import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo/Logo';

const Styles = styled.div`
    .navbar{
        background-color: #ff9966;
        border-bottom: 3px solid #47B7C1;
        margin-bottom: 20px;
        box-shadow: 0px 15px 15px -10px black;
    }
    .nav-link{
        color: black !important;
        font-weight: bold;
        font-size: 25px;
    }
    .nav-link:hover{
        color: white !important;
    }
`;
//47B7C1 pink color
const navigationBar = () => (
    <Styles>
        <Navbar expand="md">
            <Navbar.Brand as={Link} to="/"><Logo height="70px"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-nav-bar" />
            <Navbar.Collapse id="basic-nav-bar">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link as={Link} to="/login">Login</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link as={Link} to="/register">Register</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);

export default navigationBar;