import React, { Component } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';
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
        user: this.props.user
    }

    logout() {
        this.props.onLogout();
        this.props.history.push("/login");
    }

    componentDidMount(){
        //console.log(this.props);
    }
    

    render() {
        if (this.props.user) {
            return (
                <UserPanelWrap>
                    <img src={this.state.user.imgUrl} alt="avatar" height="50px;"/>
                    <DropdownButton id="dropdown-basic-button" title={this.state.user.firstName + ' ' + this.state.user.lastName}>
                        <Dropdown.Item disabled>Logged in as: {this.state.user.username}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => this.logout()}>Logout</Dropdown.Item>
                    </DropdownButton>
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