import React, { Fragment } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MessageWrap = styled.div`
    width: 35%;
    background-color: white;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;

    .usrImg{
        width: 15%;
        float: left;
        margin-top: 5%;
        border-radius: 50%;
    }

    .msgDetails{
        width: 80%;
        float: left;
        text-align: left;
        margin-top: 4%;
        padding-left: 10px;
    }

    .msgDetails a{
        color: black;
        font-weight: bold;
        font-size: 18px;
    }
`;

//const timeFromNow = (timestamp) => moment(timestamp).fromNow();

const Message = (props) => (
    <Fragment>
        <MessageWrap>
            <img className="usrImg" src={props.message.user.imgUrl} alt="userImage" height="50px;" />
            <div className="msgDetails">
                <span><Link to="/chat">{props.message.user.username}</Link> <Moment style={{ fontSize: '12px' }} fromNow>{props.message.timestamp}</Moment></span>
                <p>{props.message.messageContent}</p>
            </div>
            <div style={{ clear: 'both' }}></div>
        </MessageWrap>
    </Fragment>
);

export default Message;