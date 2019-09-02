import React, { Component } from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessageForm from './MessageForm/MessageForm';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import axiosMessages from '../../../axios-messages';
import Message from './Message/Message';
import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import Channels from '../SidePanel/Channels/Channels';


const MessagesPanelWrap = styled.div`
    height: 100vh;
    width: 60%;
    float: left;
    overflow: hidden;
`
const MessagesWrap = styled.div`
    margin-top: 1%;
    margin-bottom: 1%;
    height: 72%;
    background-color: #ffeee6;
    overflow-Y: scroll;
    border-radius: 0px;
    padding: 10px;
`;

let stompClient;
class MessagesPanel extends Component {

    state = {
        currentChannelId: undefined,
        user: this.props.user,
        messages: [],
        isLoaded: false
    }

    getCurrentChannelId = (id) => {
        //console.log(id);
        if (!this.state.isLoaded) {
            //console.log("postavljam id: " + id)
            this.setState({ currentChannelId: id, isLoaded: true });
        }
        else {
            if (id !== this.state.currentChannelId) {
                //console.log("postavljam novi id: " + id);
                this.setState({ currentChannelId: id });
            }
        }
    }

    addMessage = (message) => {
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

    setChannelId(id) {
        this.setState({ currentChannelId: id });
    }

    axiosFunction = () => {
        const headers = {
            "Authorization": `Bearer ${this.props.token}`
        }
        axiosMessages.get("/findAll/" + this.state.currentChannelId, { headers: headers }).then(response => {
            this.setState({ messages: response.data });
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        let currentComponent = this;
        
        stompClient = this.props.stompClient;

        console.log(stompClient);
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentChannelId !== this.state.currentChannelId) {
           this.axiosFunction();
        }
    }

    componentWillMount() {
        clearInterval(this.interval);
    }

    displayMesages = (messages) => {
        if (messages.length > 0) {
            return (
                messages.map(message => (
                    <Message key={message.id} message={message} user={this.state.user} />
                )));
        }
    }

    render() {
        const { messages } = this.state;
        if (this.props.channel) {
            return (
                <MessagesPanelWrap>
                    <MessagesHeader {...this.props} currentChannelId={this.getCurrentChannelId} />
                    <MessagesWrap>
                        {this.displayMesages(messages)}
                    </MessagesWrap>
                    <MessageForm channel={this.props.channel} user={this.props.user} token={this.props.token} messageToAdd={this.addMessage} />
                </MessagesPanelWrap>
            );
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
        channel: state.channel.currentChannel,
        mesages: state.messages
    };
};

export default connect(mapStateToProps, null)(MessagesPanel);
