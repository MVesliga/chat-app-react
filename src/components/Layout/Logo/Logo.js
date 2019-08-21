import React from 'react';
import chatLogo from '../../../assets/images/logo.png';
import classes from './Logo.moldule.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={chatLogo} alt="chat logo" height={props.height} />
    </div>
);

export default logo;