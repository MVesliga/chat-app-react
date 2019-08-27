import React, {Fragment} from 'react';

const Message = (props) => (
    <Fragment>
        <h1>{props.message.messageContent}</h1>
    </Fragment>
);

export default Message;