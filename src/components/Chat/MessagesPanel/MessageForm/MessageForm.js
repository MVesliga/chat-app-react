import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import SockJsClient from 'react-stomp';
import axiosMessages from '../../../../axios-messages';

const MessageFormWrap = styled.div`
    width: 60%;
    padding: 10px;
    min-height: 12%;
    height: 12%;
    text-align: left;
    position: fixed;
    left: 0;
    right: 0;
    margin-left: 15%;
    bottom: 1em;
    z-index: 200;
    button {
        width: 100%;
    }

    .row{
        margin-bottom: 1%;
    }

    .sendBtn {
        background-color: #ff9966;
        border-color: #ff9966;
    }

    .sendBtn:hover{
        background-color: #ff7733;
        border-color: #ff9966;
    }
`;

const initialState = {
    messageContent: '',
    messageEmptyError: false
}
class MessageForm extends Component {

    state = {
        messageContent: '',
        messageEmptyError: false
    }

    inputChangedHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    sendMessage = (event) =>  {
        event.preventDefault();

        if(this.state.messageContent.length === 0){
            this.setState({messageEmptyError: true});
        }
        else{
            const message = {
                channelId: this.props.channel.id,
                messageContent: this.state.messageContent,
                user: this.props.user
            }
    
            const headers = {
                "Authorization": `Bearer ${this.props.token}`
            }
    
            axiosMessages.post("/add", message, {headers: headers}).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
    
            this.setState(initialState);
        }
        
    }

    render() {
        const { messageContent, messageEmptyError } = this.state;

        return (
            <Container>
                <MessageFormWrap>
                    <Form onSubmit={this.sendMessage}>
                    <Form.Group>
                        <Row>
                            <Col lg="12">
                                <Form.Control style={{borderColor: messageEmptyError ? 'red' : null}} type="text" name="messageContent" autoComplete="off" placeholder="Enter message" onChange={this.inputChangedHandler} value={messageContent}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <Button type="submit" className="sendBtn">Send</Button>
                            </Col>
                            <Col lg="6">
                                <Button variant="info">Upload files</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                    </Form>
                    
                </MessageFormWrap>
            </Container>
        );
    }
}

export default MessageForm;