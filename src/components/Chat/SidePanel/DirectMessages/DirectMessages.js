import React, {Component} from 'react';
import styled from 'styled-components';
import axiosUsers from '../../../../axios-users';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../../../store/actions';

const DirectMessagesWrap = styled.div`
    padding: 5%;
    color: white;
    font-size: 20px;
    text-align: left !important;
    border: 1px solid red;

    #userDisplayItem:hover{
        background-color: #ff7733;
        cursor: pointer;
    }
`

const UserDisplayItem = styled.div`
    width: 100%;
`

class DirectMessages extends Component {

    state = {
        users: [],
        activeUser: ''
    }

    getUsers(){
        const headers = {
            "Authorization": `Bearer ${this.props.token}`
        }

        let loadedUsers = [];

        axiosUsers.get("/getAll", {headers: headers}).then(response => {
            loadedUsers.push(...response.data);

            loadedUsers = loadedUsers.filter(user => {
                return user.id !== this.props.user.id;
            });

            this.setState({users: loadedUsers});
        })
        .catch(error => {
            console.log(error);
        })
    }  

    changeUserMessageChannel = (user) => {
        this.setState({activeUser: user.username});

        const userMessageChannelId = this.getUserMessageChannelId(user.id);

        const channelData = {
            id: userMessageChannelId,
            channelName: user.username
        }

        this.props.setCurrentChannel(channelData);
        this.props.setPrivateChannel(true);
        
    }

    getUserMessageChannelId = (userId) => {
        const currentUserId = this.props.user.id;

        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    }

    displayUsers = (users) => (
        users.map(user => (
            <UserDisplayItem 
            id="userDisplayItem" 
            key={user.id}
            onClick={() => this.changeUserMessageChannel(user)} 
            name={user.username}
            style={{ backgroundColor: user.username === this.state.activeUser ? '#ff7733' : null }}>{user.firstName} {user.lastName}</UserDisplayItem>
        ))
    );

    componentDidMount(){
        //console.log(this.props);
        this.getUsers();
    }

    render(){
        const {users} = this.state;
        return (
            <DirectMessagesWrap>
                <b style={{float: 'left'}}>Direct Messages</b>
                <div style={{ clear: 'both' }}></div>
                {this.displayUsers(users)}
            </DirectMessagesWrap>
        )
    }
}

export default connect(null, {setCurrentChannel, setPrivateChannel})(DirectMessages);