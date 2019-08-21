import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Form, FormControl, Button } from 'react-bootstrap';

const MessageFormWrap = styled.div`
    width: 60%;
    border: 1px solid black;
    padding: 10px;
    min-height: 12%;
    height: 12%;
    text-align: left;
    position: fixed;
    left: 0;
    right: 0;
    margin-left: 15%;
    bottom: 1em;
`;

class MessageForm extends Component {
    render() {
        return (
            <Fragment>
                <MessageFormWrap>
                    <Form inline>
                        <Form.Group>
                            <Form.Control type="text" name="message" placeholder="Enter message" />
                            <Button>Send</Button>
                        </Form.Group>
                    </Form>
                </MessageFormWrap>
            </Fragment>
        );
    }
}

export default MessageForm;