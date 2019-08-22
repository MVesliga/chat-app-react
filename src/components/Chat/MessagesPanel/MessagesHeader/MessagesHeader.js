import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import Spinner from '../../../Spinner/Spinner';

const Header = styled.div`
    width: 100%;
    background-color: #ffeee6;
    padding: 10px;
    border-radius: 10px;
    border-bottom: 1px solid black;
    min-height: 12%;
    height: 12%;
    overflow: hidden;
`;

const ChannelName = styled.div`
    text-align: left;
    width: 50%;
    float: left;
`;
const Search = styled.div`
    margin: 2% auto;
    width: 50%;
    float: right;
    

    .btn-outline-info{
        color: #47B7C1;
        border-color: #47B7C1;
    }

    .btn-outline-info:hover{
        background-color: #47B7C1;
    }
`;
class MessagesHeader extends Component {
    render() {
        if (this.props.channel) {
            return (
                <Fragment>
                    <Header>
                        <ChannelName>
                            <h2>{this.props.channel.channelName}</h2>
                            <div>
                                <span><i className="fa fa-user"></i> Number of users</span>
                            </div>
                        </ChannelName>
                        <Search>
                            <div style={{ float: 'right' }}>
                                <Form inline>
                                    <FormControl type="text" placeholder="&#xF002; Search" className="mr-sm-2" style={{ fontFamily: 'Arial, FontAwesome' }} />
                                    <Button variant="outline-info">Search</Button>
                                </Form>
                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </Search>
                        <div style={{ clear: 'both' }}></div>
                    </Header>
                </Fragment>
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
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps, null)(MessagesHeader);