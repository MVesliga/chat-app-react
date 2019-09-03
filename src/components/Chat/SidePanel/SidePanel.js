import React, {Component} from 'react';
import styled from 'styled-components';
import UserPanel from './UserPanel/UserPanel';
import Channels from './Channels/Channels';

const SidePanelWrap = styled.div`
    height: 100vh;
    width: 15%;
    float: left;
    overflow: hidden;
    background: #ff9966;
`

class SidePanel extends Component {

    resetChannelError = (flag) => {
        if(flag){
            this.props.resetChnlError(true);
        }
    }

    render (){
        return(
            <SidePanelWrap>
                <UserPanel {...this.props}/>
                <hr />
                <Channels {...this.props} stompClient={this.props.stompClient} channel={this.props.channel} channelError={this.props.channelError} resetChnlError={this.resetChannelError}/>
            </SidePanelWrap>
        );
    }
}

export default SidePanel;
