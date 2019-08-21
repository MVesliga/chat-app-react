import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const MessageFormWrap = styled.div`
    width: 60%;
    border: 1px solid black;
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
    }
`;

const initialState = {
    message: ''
}
class MessageForm extends Component {

    state = {
        message: ''
    }

    inputChangedHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    sendMessage = (event) =>  {
        event.preventDefault();
        console.log(this.state.message);
        this.setState(initialState);
    }

    render() {
        const { message } = this.state;

        return (
            <Container>
                <MessageFormWrap>
                    <Form onSubmit={this.sendMessage}>
                    <Form.Group>
                        <Row>
                            <Col lg="12">
                                <Form.Control type="text" name="message" autoComplete="off" placeholder="Enter message" onChange={this.inputChangedHandler} value={message}/>
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