import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import styled from 'styled-components';

const DataPanelWrap = styled.div`
    height: 100vh;
    width: 25%;
    float: left; 
    overflow: hidden;
`

class DataPanel extends Component {

    dataPanelClick() {
        console.log(this.props);
    }

    render (){
        return(
            <DataPanelWrap>
                <Button onClick={() => this.dataPanelClick()}>Click me</Button>
            </DataPanelWrap>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps, null)(DataPanel);
