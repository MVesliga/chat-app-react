import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Moment from 'react-moment';
import Spinner from '../../Spinner/Spinner';

const DataPanelWrap = styled.div`
    height: 100vh;
    width: 25%;
    float: left; 
    overflow: hidden;

    .card{
        text-align: left;
    }
    
    .channelDetailsHeader{
        font-weight: bold;
        color:  #a6a6a6;
    }
`
const DataPanelHeader = styled.div`
    height: 12%;
    text-align: center;
    padding-top: 6%;
`;

const UserDataWrap = styled.div`
    height: 100vh;
    width: 25%;
    float: left; 
    overflow: hidden;

    .usrData{
        text-align: left;
        padding: 10px;
    }

    .usrDataHeader{
        font-weight: bold;
        color:  #a6a6a6;
    }
`

const UserDataHeader = styled.div`
    height: 12%;
    text-align: center;
    padding-top: 6%;
`

const TextData = styled.div`
    width: 50%;
    float: left;
`
const ImageData = styled.div`
    width: 50%;
    float: right;
    padding: 15px;
`
class DataPanel extends Component {

    state = {
        currentChannel: this.props.channel,
        accordionOpen: false,
        showUserData: false,
        user: this.props.user,
        showModal: false
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.setState({ currentChannel: nextProps.channel });
        this.setState({ showUserData: nextProps.showUserData });
    }

    toggleAccordion = () => {
        this.setState({ accordionOpen: !this.state.accordionOpen });
    }

    resetUserData = () => {
        this.setState({ showUserData: false });
        this.props.resetShowUsrData(true);
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    inputChangedHandler = (event) => {
        let userCopy = this.state.user;
        userCopy[event.target.name] = event.target.value;
        this.setState({user: userCopy});
    };

    render() {
        if (this.state.currentChannel) {
            if (this.state.showUserData) {
                return (
                    <UserDataWrap>
                        <UserDataHeader>
                            <h2>User data</h2>
                        </UserDataHeader>
                        <hr />
                        <img src={this.state.user.imgUrl} alt="avatar" />
                        <br /><br />
                        <div>
                            <Button style={{ marginRight: '10px' }}>Message</Button>
                            <Button onClick={this.showModal}>Edit Profile</Button>
                        </div>
                        <hr />
                        <div className="usrData">
                            <p className="usrDataHeader">Full Name</p>
                            <p>{this.state.user.firstName} {this.state.user.lastName}</p>
                            <hr />
                            <p className="usrDataHeader">Email</p>
                            <p>{this.state.user.email}</p>
                        </div>
                        <br /><br />
                        <Button variant="danger" onClick={this.resetUserData}>close</Button>

                        <Modal style={{ zIndex: '200px' }} show={this.state.showModal} animation={true} onHide={() => this.closeModal()} size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit your Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: 'center' }}>
                                <Form>
                                    <TextData>
                                        <Form.Group >
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control type="text" name="firstName" onChange={this.inputChangedHandler} placeholder="Enter your first name" value={this.state.user.firstName} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control type="text" name="lastName" onChange={this.inputChangedHandler} placeholder="Enter your last name" value={this.state.user.lastName} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" name="username" onChange={this.inputChangedHandler} placeholder="Enter username" value={this.state.user.username} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" name="email" onChange={this.inputChangedHandler} placeholder="Enter your email" value={this.state.user.email} />
                                        </Form.Group>
                                    </TextData>
                                    <ImageData>
                                        <img src={this.state.user.imgUrl} alt="avatar" />
                                        <input type="file" />
                                    </ImageData>
                                    <div style={{clear: 'both'}}></div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => console.log(this.state.user)}>Save</Button>
                                <Button variant="danger" onClick={() => this.closeModal()}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </UserDataWrap>
                )
            }
            else {
                return (
                    <DataPanelWrap>
                        <DataPanelHeader>
                            <h2>About this channel</h2>
                        </DataPanelHeader>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={this.toggleAccordion}>
                                    <span><i className="fa fa-info-circle"></i> Channel Details </span><i style={{ paddingLeft: '56%' }} className={this.state.accordionOpen ? "fa fa-chevron-down" : "fa fa-chevron-right"}></i>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <p className="channelDetailsHeader">Channel name</p>
                                        <p>{this.state.currentChannel.channelName}</p>
                                        <hr />
                                        <p className="channelDetailsHeader">Channel description</p>
                                        <p>{this.state.currentChannel.channelDescription}</p>
                                        <hr />
                                        <p className="channelDetailsHeader">Created</p>
                                        <p>Created by {this.state.currentChannel.createdBy.firstName} {this.state.currentChannel.createdBy.lastName} on <Moment format="MMMM D, YYYY">{this.state.currentChannel.creationDate}</Moment>.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </DataPanelWrap>
                );
            }

        }
        else {
            return (
                <div>
                    <Spinner />
                    <h1>Loading messages...</h1>
                </div>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps, null)(DataPanel);
