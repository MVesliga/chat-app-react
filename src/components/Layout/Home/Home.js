import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../Navigation/NavigationBar';
import Footer from '../Footer/Footer';


const Block = styled.div`
    background-color: ${props => props.color};
    height: 75vh;
    width: 50%;
    float: left;
    border-radius: 15px;
`;

const CenterMessage = styled.div`
    margin: 25% auto;
    width: 50%;

    a{
        text-decoration: none;
    }

    a:hover{
        text-decoration: none;
        color: white;
    }
`;
const home = () => (
    <Fragment>
        <NavigationBar />
        <Block color="#47B7C1">
            <CenterMessage>
                <h1><Link to="/login">Login</Link> now</h1>
                <h4>And chat with all your friends!</h4>
                <p><strong>MyChat</strong> is the best place to share your stories with anybody you like!</p>
            </CenterMessage>
        </Block>
        <Block color="#ff9966">
            <CenterMessage>
                <h1>Don't have an acount yet?</h1>
                <h4><Link to="/register">Register</Link> now and start chatting!</h4>
            </CenterMessage>
        </Block>
        <div style={{clear: 'both'}}></div>
        <Footer />
    </Fragment>
    
);

export default home;