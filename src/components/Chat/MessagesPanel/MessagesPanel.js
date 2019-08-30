import React, { Component } from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessageForm from './MessageForm/MessageForm';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import axiosMessages from '../../../axios-messages';
import Message from './Message/Message';
import SockJsClient from 'react-stomp';


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
        this.setState(oldState => ({
            messages: [...oldState.messages, message]
        }));
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

    componentDidUpdate(prevProps, prevState) {
        //console.log(this.state);

        if (prevState.currentChannelId !== this.state.currentChannelId) {
           this.axiosFunction();
           this.interval = setInterval(this.axiosFunction, 1000);
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
        channel: state.channel.currentChannel
    };
};

export default connect(mapStateToProps, null)(MessagesPanel);
