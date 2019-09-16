import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
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
    messageEmptyError: false,
    showModal: false,
    imageUrl: '',
    imageUploadError: ''
}

class MessageForm extends Component {

    state = {
        messageContent: '',
        messageEmptyError: false,
        showModal: false,
        imageUrl: '',
        imageUploadError: ''
    }

    inputChangedHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    sendImage = () => {
        if(this.state.imageUrl !== ''){
            if(this.isValidURL(this.state.imageUrl)){
                const message = {
                    channelId: this.props.channel.id,
                    isImage: true,
                    imageUrl: this.state.imageUrl,
                    messageContent: this.state.messageContent,
                    user: this.props.user
                }
                
                //console.log(message);
                this.props.messageToAdd(message);

                this.setState(initialState)
            }
            else{
                this.setState({imageUploadError: 'Please put in a valid image url!'});
            }
        }
        else{
            this.setState({imageUploadError: 'Please put in the image url you want to send!'});
        }
    }

    sendMessage = (event) => {
        event.preventDefault();

            if (this.state.messageContent.length === 0) {
                this.setState({ messageEmptyError: true });
            }
            else {
                if (this.props.isPrivateChannel) {
                    const privateMessage = {
                        fromUser: this.props.user,
                        toUser: this.props.channel.user,
                        messageContent: this.state.messageContent
                    }
    
                    this.props.messageToAdd(privateMessage);
                }
                else {
                    const message = {
                        channelId: this.props.channel.id,
                        isImage: false,
                        imageUrl: this.state.imageUrl,
                        messageContent: this.state.messageContent,
                        user: this.props.user
                    }
    
                    this.props.messageToAdd(message);
    
                }
    
                this.setState(initialState);
            }
    }

    showModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    isValidURL = (string) => {
        let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };

    render() {
        const { messageContent, messageEmptyError, imageUrl } = this.state;

        return (
            <Container>
                <MessageFormWrap>
                    <Form onSubmit={this.sendMessage}>
                        <Form.Group>
                            <Row>
                                <Col lg="12">
                                    <Form.Control style={{ borderColor: messageEmptyError ? 'red' : null }} type="text" name="messageContent" autoComplete="off" placeholder="Enter message" onChange={this.inputChangedHandler} value={messageContent} />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <Button type="submit" className="sendBtn">Send</Button>
                                </Col>
                                <Col lg="6">
                                    <Button variant="info" onClick={() => this.showModal()}>Upload picture</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>

                    <Modal show={this.state.showModal} animation={true} onHide={() => this.closeModal()} size="lg" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Picture</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group >
                                <Form.Label><b>Image url</b></Form.Label>
                                <Form.Control type="text" name="imageUrl" autoComplete="off" placeholder="Enter image URL" onChange={this.inputChangedHandler} value={imageUrl}/>
                                <p style={{color: 'red'}}>{this.state.imageUploadError ? this.state.imageUploadError : null}</p>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => this.sendImage()}>Save</Button>
                            <Button variant="danger" onClick={() => this.closeModal()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </MessageFormWrap>
            </Container>
        );
    }
}

export default MessageForm;