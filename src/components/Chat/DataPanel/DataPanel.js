import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Moment from 'react-moment';
import Spinner from '../../Spinner/Spinner';
import axiosUsers from '../../../axios-users';

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

    .usrImg{
        width: 15%;
        float: left;
        margin-top: 5%;
        border-radius: 50%;
    }

    .usrDetails{
        width: 80%;
        float: left;
        text-align: left;
        margin-top: 4%;
        padding-left: 10px;
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

// const initialState = {
//     showModal: false,
//     newImage: '',
//     imageUploaded: false
// }
class DataPanel extends Component {

    state = {
        currentChannel: this.props.channel,
        accordionOpen: false,
        showUserData: false,
        user: this.props.user,
        showModal: false,
        isPrivateChannel: this.props.isPrivateChannel
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.setState({ currentChannel: nextProps.channel });
        this.setState({ showUserData: nextProps.showUserData });
        this.setState({ isPrivateChannel: nextProps.isPrivateChannel });
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
        //postavi usera na this.props.user
        this.setState({
            user: this.props.user,
            newImage: '',
            imageUploaded: false,
            showModal: false
        });
    }

    inputChangedHandler = (event) => {
        let userCopy = this.state.user;
        userCopy[event.target.name] = event.target.value;
        this.setState({ user: userCopy });
    };

    updateUser = () => {
        let updatedUser = this.state.user;
    
        const headers = {
            "Authorization": `Bearer ${this.props.token}`
        }
        axiosUsers.put("/updateUser", updatedUser, { headers: headers }).then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.currentChannel) {
            if (this.state.isPrivateChannel) {
                if (this.state.showUserData) {
                    return (
                        <UserDataWrap>
                            <UserDataHeader>
                                <h2>User data</h2>
                            </UserDataHeader>
                            <hr />
                            <img src={this.state.user.imgUrl} alt="avatar" height="100px" />
                            <br /><br />
                            <div>
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
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => this.updateUser()}>Save</Button>
                                    <Button variant="danger" onClick={() => this.closeModal()}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </UserDataWrap>
                    )
                }else{
                    return (
                        <UserDataWrap>
                            <UserDataHeader>
                                <h2>About this user</h2>
                            </UserDataHeader>
                            <hr />
                            <img src={this.state.currentChannel.user.imgUrl} alt="userImage" />
                            <br /><br />
                            <hr />
                            <div className="usrData">
                                <p className="usrDataHeader">Full Name</p>
                                <p>{this.state.currentChannel.user.firstName} {this.state.currentChannel.user.lastName}</p>
                                <hr />
                                <p className="usrDataHeader">Email</p>
                                <p>{this.state.currentChannel.user.email}</p>
                            </div>
                        </UserDataWrap>
                    )
                }
            }
            else {
                if (this.state.showUserData) {
                    return (
                        <UserDataWrap>
                            <UserDataHeader>
                                <h2>User data</h2>
                            </UserDataHeader>
                            <hr />
                            <img src={this.state.user.imgUrl} alt="avatar" height="100px" />
                            <br /><br />
                            <div>
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
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => this.updateUser()}>Save</Button>
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
        }

        else {
            return (
                <div>
                    <Spinner />
                    <h1>Loading data...</h1>
                </div>
            );
        }

    }
}

export default DataPanel;
