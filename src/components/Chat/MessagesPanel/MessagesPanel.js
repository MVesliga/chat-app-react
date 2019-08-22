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
                <MessagesHeader {...this.props}/>
                <div style={{marginTop: '1%', marginBottom: '1%', height: '72%', backgroundColor: '#ccc', overflowY: 'scroll', borderRadius: '10px'}}>
                    <h1>Messages</h1>
                </div>
                <MessageForm />
            </MessagesPanelWrap>
        );
    }
}

export default MessagesPanel;
