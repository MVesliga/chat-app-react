import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosChannels from '../../../../axios-channels';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../../../store/actions';

const ChannelsWrap = styled.div`
    padding: 5%;
    color: white;   
    font-size: 20px;
    text-align: left !important;
    border: 1px solid black;

    i:hover{
        font-size: 25px; 
        cursor: pointer;
    }

    #channelDisplayItem:hover{
        background-color: #ff7733;
        cursor: pointer;
    }
`;

const ChannelErrorMessage = styled.div`
    background-color: #ffcccc;
    width: 50%;
    margin: 0 auto;
    border: 1px solid red;
    border-radius: 5px;
    padding: 5px;
    color: red;
    font-size: 20px;
    margin-bottom: 20px;
`;

const ChannelDisplayItem = styled.div`
    width: 100%;
`;

const initialState = {
    channelName: '',
    channelDescription: '',
    addChannelError: ''
}


let stompClient;
class Channels extends Component {

    state = {
        channels: [],
        showModal: false,
        channelName: '',
        channelDescription: '',
        addChannelError: '',
        firstLoad: true,
        activeChannel: ''
    }


    getChannels() {
        const headers = {
            "Authorization": `Bearer ${this.props.token}`
        }
        let loadedChannels = [];
        axiosChannels.get("/getAll", { headers: headers }).then(response => {
            loadedChannels.push(...response.data);
            this.setState({ channels: loadedChannels });
            this.setFirstChannel();
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.getChannels();

        stompClient = this.props.stompClient;
    }
    
    componentWillReceiveProps(nextProps){
        //console.log(nextProps);

        if(nextProps.channelError !== ""){
            this.setState({addChannelError: nextProps.channelError});
        }

        if(nextProps.channel !== undefined){
            this.setState(oldState => ({
                channels: [...oldState.channels, nextProps.channel],
                addChannelError: "",
                channelName: '',
                channelDescription: '',
                showModal: false
            }));
        }

        //this.props.resetChnlError(true);
    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setState({ firstLoad: false, activeChannel: firstChannel.channelName });
        }
    }

    setActiveChannel = (channel) => {
        this.setState({ activeChannel: channel.channelName });
    }

    displayChannels = (channels) => (
        //console.log(channels);
        channels.map(channel => (
            <ChannelDisplayItem
                id="channelDisplayItem"
                key={channel.channelName} 
                onClick={() => this.changeChannel(channel)}
                name={channel.channelName}
                style={{ backgroundColor: channel.channelName === this.state.activeChannel ? '#ff7733' : null }}>{channel.channelName}</ChannelDisplayItem>
        ))
    );

    changeChannel = (channel) => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
    }

    inputChangedHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    showModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    addChannel() {
        const channel = {
            channelName: this.state.channelName,
            channelDescription: this.state.channelDescription,
            user: this.props.user
        }

       stompClient.send("/app/chat.addChannel", {}, JSON.stringify(channel));
    }

    render() {
        const { channels, channelName, channelDescription } = this.state;
        return (
            <ChannelsWrap>
                <b style={{ float: 'left' }}>Channels <span>({channels.length})</span></b>
                <i style={{ float: 'right', marginTop: '5px' }} className="fa fa-plus-circle" onClick={() => this.showModal()}></i>
                <div style={{ clear: 'both' }}></div>
                {this.displayChannels(channels)}

                <Modal show={this.state.showModal} animation={true} onHide={() => this.closeModal()} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Channel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group >
                            <Form.Label><b>Channel Name</b></Form.Label>
                            <Form.Control type="text" name="channelName" onChange={this.inputChangedHandler} placeholder="Enter the channel name" value={channelName} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label><b>Channel description</b></Form.Label>
                            <Form.Control type="text" name="channelDescription" onChange={this.inputChangedHandler} placeholder="Enter the channel description" value={channelDescription} />
                        </Form.Group>
                        {this.state.addChannelError ? <ChannelErrorMessage>{this.state.addChannelError}</ChannelErrorMessage> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={!this.state.channelName} variant="primary" onClick={() => this.addChannel()}>Save</Button>
                        <Button variant="danger" onClick={() => this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ChannelsWrap>
        );
    }
}

export default connect(null, { setCurrentChannel })(Channels);