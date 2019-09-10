import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../Spinner/Spinner';
import SidePanel from './SidePanel/SidePanel';
import MessagesPanel from './MessagesPanel/MessagesPanel';
import DataPanel from './DataPanel/DataPanel';
import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';

class Chat extends Component {
    state = {
        stompClient: '',
        message: undefined,
        privateMessage: undefined,
        channel: undefined,
        channelError: '',
        showUserData: false,
        isPrivateChannel: undefined
    }

    resetMessage = (flag) => {
        if(flag){
            this.setState({message: undefined});
        }
    }

    resetChannelError = (flag) => {
        if(flag){
            this.setState({channelError: ''})
        }
    }

    showUserData = (flag) => {
        if(flag){
            this.setState({showUserData: true});
        }
    }

    resetShowUserData = (flag) => {
        if(flag){
            this.setState({showUserData: false});
        }
    }

    componentDidMount(){
        let ws = new SockJS("http://localhost:8080/ws");
        let stompClient = Stomp.Stomp.over(ws);

        stompClient.connect({}, (frame) => {
           stompClient.subscribe("/topic/sendMessage", (message) => {
                this.setState({message: JSON.parse(message.body)});
            });

        stompClient.subscribe("/topic/addChannel", (channelResponse) => {
                let channelResponseObject = JSON.parse(channelResponse.body);

                if(channelResponseObject.statusCode !== "BAD_REQUEST"){
                    let channel = channelResponseObject.body;
                    this.setState({channel: channel});
                }
                else{
                    this.setState({channelError: channelResponseObject.body});
                }
            });

            stompClient.subscribe("/topic/sendPrivateMessage", (privateMessage) => {
                this.setState({message: JSON.parse(privateMessage.body)});
            });
        }, (error) => {
            console.log("STOMP protocol error " + error)
        });

        this.setState({stompClient: stompClient})
    }

    componentWillUnmount(){
       this.state.stompClient.unsubscribe('sub-0');
       this.state.stompClient.unsubscribe('sub-1');
       this.state.stompClient.unsubscribe('sub-2');
    }

    render() {
        if (this.props.isAuthenticated) {
            if (this.props.user && this.state.stompClient) {
                return (
                    <Fragment>
                        <SidePanel {...this.props} stompClient={this.state.stompClient} channel={this.state.channel} channelError={this.state.channelError} resetChnlError={this.resetChannelError} showUsrData={this.showUserData}/>
                        <MessagesPanel {...this.props} stompClient={this.state.stompClient} newMessage={this.state.message} resetMsg={this.resetMessage} isPrivateChannel={this.props.isPrivateChannel}/>
                        <DataPanel {...this.props} showUserData={this.state.showUserData} resetShowUsrData={this.resetShowUserData} isPrivateChannel={this.props.isPrivateChannel}/>
                        <div style={{ clear: 'both' }}></div>
                    </Fragment>
                );
            }
            else {
                return (
                    <div>
                        <Spinner />
                        <h1>Loading...</h1>
                        <h1>chat</h1>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                    <div>Please log in to chat!</div>
                    <Link to="/login">Login</Link>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        isAuthenticated: state.auth.token !== null,
        channel: state.channel.currentChannel,
        isPrivateChannel: state.channel.isPrivateChannel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);