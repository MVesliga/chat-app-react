import React, {Component} from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessageForm from './MessageForm/MessageForm';

const MessagesPanelWrap = styled.div`
    height: 100vh;
    width: 60%;
    float: left;
    overflow: hidden;
`

class MessagesPanel extends Component {
    render (){
        return(
            <MessagesPanelWrap>
                <MessagesHeader />
                <div style={{height: '60%', backgroundColor: '#ccc'}}>
                    <h1>Messages</h1>
                </div>
                <MessageForm />
            </MessagesPanelWrap>
        );
    }
}

export default MessagesPanel;
