import React, {Component} from 'react';
import styled from 'styled-components';

const DirectMessagesWrap = styled.div`
    padding: 5%;
    color: white;
    font-size: 20px;
    text-align: left !important;
    border: 1px solid red;
`

class DirectMessages extends Component {

    state = {
        users: []
    }

    render(){
        const {users} = this.state;
        return (
            <DirectMessagesWrap>
                <b style={{float: 'left'}}>Direct Messages <span>({users.length})</span></b>
                <i style={{ float: 'right', marginTop: '5px' }} className="fa fa-plus-circle"></i>
                <div style={{ clear: 'both' }}></div>
            </DirectMessagesWrap>
        )
    }
}

export default DirectMessages;