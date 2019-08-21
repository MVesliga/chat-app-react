import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    position:absolute;
    text-align: center;
    color: white;
    border-top: 2px solid #47B7C1;
    padding: 0.5% 0px 0.5% 0px;
    background-color: #ff9966;
    bottom:0;
    width:100%;
    font-size: 15px;
`;
const footer = () => (
    <Footer>
        <p>&copy; Martin Vešliga</p>
    </Footer>
);

export default footer;