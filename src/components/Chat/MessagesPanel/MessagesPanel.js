import React, { Component } from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessageForm from './MessageForm/MessageForm';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import axiosMessages from '../../../axios-messages';
import Message from './Message/Message';
import PrivateMessage from './Message/PrivateMessage';

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
        privateMessages: [],
        isLoaded: false,
        searchString: '',
        searchResult: []
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
        if (this.props.isPrivateChannel) {
            //console.log(message);
            stompClient.send("/app/chat.sendPrivateMessage", {}, JSON.stringify(message));
        }
        else {
            if(message.image){
                console.log(message);

                const headers = {
                    "Authorization": `Bearer ${this.props.token}`
                }

                axiosMessages.post("/messages/image", message, {headers: headers}).then(response => {
                    //this.setState({messages: [...this.state.messages, message]});
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else{
                stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
            } 
        }

    }

    searchMessages = (searchString) => {
        this.setState({ searchString: searchString });
        let searchResult;
        if (this.props.isPrivateChannel) {
            const privateMessages = [...this.state.privateMessages];

            searchResult = privateMessages.filter(privateMessage => {
                return privateMessage.messageContent.match(searchString);
            });
        }
        else {
            const messages = [...this.state.messages];

            searchResult = messages.filter(message => {
                return message.messageContent.match(searchString);
            });
        }


        this.setState({ searchResult: searchResult });
    }

    setChannelId(id) {
        this.setState({ currentChannelId: id });
    }

    axiosFunction = () => {
        const headers = {
            "Authorization": `Bearer ${this.props.token}`
        }

        if (this.props.isPrivateChannel) {
            // axiosMessages.get("/privateMessages/findAll/" + this.state.user.username + "/" + this.props.channel.channelName, {headers: headers}).then(response => {
            //     this.setState({messages: response.data});
            // })
            // .catch(error => {
            //     console.log(error);
            // });

            axiosMessages.get("/privateMessages/findAll", { headers: headers }).then(response => {
                this.setState({ privateMessages: response.data });
            })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            axiosMessages.get("/messages/findAll/" + this.state.currentChannelId, { headers: headers }).then(response => {
                this.setState({ messages: response.data });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newMessage !== undefined) {
            if (nextProps.isPrivateChannel) {
                this.setState(oldState => ({
                    privateMessages: [...oldState.privateMessages, nextProps.newMessage]
                }));
            }
            else {
                this.setState(oldState => ({
                    messages: [...oldState.messages, nextProps.newMessage]
                }));
            }
        }

        this.props.resetMsg(true);
    }

    componentDidMount() {
        stompClient = this.props.stompClient;
        if(this.messagesEnd){
            this.scrollToBottom();
        }
    }


    componentDidUpdate(prevProps, prevState) {
        //console.log(this.props);
        if (prevState.currentChannelId !== this.state.currentChannelId) {
            this.axiosFunction();
        }
        if(this.messagesEnd){
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: 'smooth'});
    }

    displayMessages = (messages) => {
        let returnMessage;

        if (messages.length > 0) {
            if (this.props.isPrivateChannel) {
                returnMessage = messages.map((message, i) => {
                    return ((message.fromUser.username === this.state.user.username && message.toUser.username === this.props.channel.user.username) ||
                        (message.fromUser.username === this.props.channel.user.username && message.toUser.username === this.state.user.username)) ? <PrivateMessage key={message.id} message={message} user={this.state.user} /> : null
                });
            }
            else {
                returnMessage = messages.map((message, i) => {
                    return (message.channelId === this.state.currentChannelId) ? <Message key={message.id} message={message} user={this.state.user} /> : null
                });
            }

        }

        return returnMessage;
    }

    render() {
        const { messages, privateMessages, searchResult } = this.state;
        if (this.props.channel) {
            return (
                <MessagesPanelWrap>
                    <MessagesHeader {...this.props} currentChannelId={this.getCurrentChannelId} searchMessages={this.searchMessages} />
                    <MessagesWrap>
                        {this.state.searchString ? this.displayMessages(searchResult) : this.props.isPrivateChannel ? this.displayMessages(privateMessages) : this.displayMessages(messages)}
                        <div ref={node => (this.messagesEnd = node)} />
                    </MessagesWrap>
                    <MessageForm channel={this.props.channel} user={this.props.user} token={this.props.token} messageToAdd={this.addMessage} isPrivateChannel={this.props.isPrivateChannel} />
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
