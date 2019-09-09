import React, {Component} from 'react';
import styled from 'styled-components';
import UserPanel from './UserPanel/UserPanel';
import Channels from './Channels/Channels';
import DirectMessages from './DirectMessages/DirectMessages';

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

    showUserData = (flag) => {
        if(flag){
            this.props.showUsrData(true);
        }
    }

    render (){
        return(
            <SidePanelWrap>
                <UserPanel {...this.props} showUsrData={this.showUserData}/>
                <hr />
                <Channels {...this.props} stompClient={this.props.stompClient} channel={this.props.channel} channelError={this.props.channelError} resetChnlError={this.resetChannelError}/>
                <br /><br />
                <DirectMessages />
            </SidePanelWrap>
        );
    }
}

export default SidePanel;
