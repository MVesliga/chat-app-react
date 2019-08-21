import React, {Component} from 'react';
import styled from 'styled-components';

const DataPanelWrap = styled.div`
    height: 100vh;
    width: 25%;
    float: left; 
    overflow: hidden;
`

class DataPanel extends Component {
    render (){
        return(
            <DataPanelWrap>
                <h1>Data Panel</h1>
            </DataPanelWrap>
        );
    }
}

export default DataPanel;
