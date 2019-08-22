import React, { Component } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton, Modal, Button } from 'react-bootstrap';
import Spinner from '../../../Spinner/Spinner';

const UserPanelWrap = styled.div`
    margin: 3% auto;
    width: 80%;

    img {
        border-radius: 50%;
        margin-bottom: 10px;
    }

    .dropdown button{
        width: 100%;
        background-color: #47B7C1;
    }
`;

class UserPanel extends Component {

    state = {
        user: this.props.user,
        showModal: false
    }

    logout() {
        this.props.onLogout();
        this.props.history.push("/login");
    }

    componentDidMount(){
        //console.log(this.props);
    }
    
    showModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    render() {
        if (this.props.user) {
            return (
                <UserPanelWrap>
                    <img src={this.state.user.imgUrl} alt="avatar" height="50px;"/>
                    <DropdownButton id="dropdown-basic-button" title={this.state.user.firstName + ' ' + this.state.user.lastName}>
                        <Dropdown.Item disabled>Logged in as: {this.state.user.username}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => this.showModal()}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.logout()}>Logout</Dropdown.Item>
                    </DropdownButton>


                    <Modal show={this.state.showModal} animation={true} onHide={() => this.closeModal()} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <img src={this.state.user.imgUrl} alt="userImage"/>
                            <h2>{this.state.user.username}</h2>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={!this.state.channelName} variant="primary" onClick={() => this.closeModal()}>Save</Button>
                        <Button variant="danger" onClick={() => this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </UserPanelWrap>
            );
        }
        else {
            return (
                <div>
                    <Spinner />
                    <h1>Loading...</h1>
                </div>
            );
        }
    }
}

export default UserPanel;