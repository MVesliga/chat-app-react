import React, {Component} from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessageForm from './MessageForm/MessageForm';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import axiosMessages from '../../../axios-messages';
import Message from './Message/Message';

const MessagesPanelWrap = styled.div`
    height: 100vh;
    width: 60%;
    float: left;
    overflow: hidden;
`

class MessagesPanel extends Component {

    state = {
        currentChannelId: undefined,
        loadedMessages: [],
        isLoaded: false
    }


    getCurrentChannelId = (id) => {
        //console.log(id);
        if(!this.state.isLoaded){
            //console.log("postavljam id: " + id)
            this.setState({currentChannelId: id, isLoaded: true});
        }
        else{
            if(id !== this.state.currentChannelId){
                //console.log("postavljam novi id: " + id);
                this.setState({currentChannelId: id});
            }
        }
        
    }

    setChannelId(id){
        this.setState({currentChannelId: id});
    } 

    componentDidUpdate(prevProps, prevState){
        //console.log(this.state);

        if(prevState.currentChannelId !== this.state.currentChannelId){
            const headers = {
                "Authorization": `Bearer ${this.props.token}`
            }
            axiosMessages.get("/findAll/" + this.state.currentChannelId, {headers: headers}).then(response => {
                this.setState({loadedMessages: response.data});
            }).catch(error => {
                console.log(error);
            });
        }
    }

    displayMesages = (messages) => {
        if(messages.length > 0){
            return(
            messages.map(message => (
                <Message key={message.id} message={message}/>
            )));
        }
    }

    render (){
        const {loadedMessages} = this.state;
        if(this.props.channel){
            return(
                <MessagesPanelWrap>
                    <MessagesHeader {...this.props} currentChannelId={this.getCurrentChannelId} />
                    <div style={{marginTop: '1%', marginBottom: '1%', height: '72%', backgroundColor: '#ccc', overflowY: 'scroll', borderRadius: '10px'}}>
                        {this.displayMesages(loadedMessages)}
                    </div>
                    <MessageForm {...this.props}/>
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
    return{
        channel: state.channel.currentChannel
    };
};

export default connect(mapStateToProps, null)(MessagesPanel);
