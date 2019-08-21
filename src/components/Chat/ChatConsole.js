import React, {Fragment} from 'react';
import SidePanel from './SidePanel/SidePanel';
import MessagesPanel from './MessagesPanel/MessagesPanel';
import DataPanel from './DataPanel/DataPanel';

const chatConsole = () => (
    <Fragment>
        <SidePanel />
        <MessagesPanel />
        <DataPanel />
        <div style={{clear: 'both'}}></div>
    </Fragment>
);

export default chatConsole;