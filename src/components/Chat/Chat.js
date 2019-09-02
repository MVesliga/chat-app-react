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

    constructor(props){
        super(props);
        this.messagesRef = React.createRef();
        //this.channelsRef = React.createRef();
    }

    state = {
        stompClient: ''
    }

    componentDidMount(){
        let ws = new SockJS("http://localhost:8080/ws");
        let stompClient = Stomp.Stomp.over(ws);
        
        console.log(this.messagesRef);

        stompClient.connect({}, function(frame){
            stompClient.subscribe("/topic/public", function(message){
                console.log(JSON.parse(message.body));
                // currentComponent.setState(oldState => ({
                //         messages: [...oldState.messages, JSON.parse(message.body)]
                //     }));
            });

            stompClient.subscribe("/topic/addChannel", function (channelResponse) {
                let channelResponseObject = JSON.parse(channelResponse.body);
                console.log(channelResponseObject);
                // if (channelResponseObject.statusCode !== "BAD_REQUEST") {
                //     let channel = channelResponseObject.body;
                //     channelComponent.setState(oldState => ({
                //         channels: [...oldState.channels, channel]
                //     }));
                // }
                // else {
                //     currentComponent.setState({ addChannelError: channelResponseObject.body });
                // }
            });
        }, function(error){
            console.log("STOMP protocol error " + error);
        });

        this.setState({stompClient: stompClient})
    }

    render() {
        if (this.props.isAuthenticated) {
            if (this.props.user && this.state.stompClient) {
                return (
                    <Fragment>
                        <SidePanel ref={this.channelsRef} {...this.props} stompClient={this.state.stompClient}/>
                        <MessagesPanel ref={this.messagesRef} {...this.props} stompClient={this.state.stompClient}/>
                        <DataPanel {...this.props}/>
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
        channel: state.channel.currentChannel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);