import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../Spinner/Spinner';
import SidePanel from './SidePanel/SidePanel';
import MessagesPanel from './MessagesPanel/MessagesPanel';
import DataPanel from './DataPanel/DataPanel';

class Chat extends Component {

    componentDidMount(){
        //console.log(this.props);
    }

    render() {
        if (this.props.isAuthenticated) {
            if (this.props.user) {
                return (
                    <Fragment>
                        <SidePanel {...this.props}/>
                        <MessagesPanel {...this.props}/>
                        <DataPanel {...this.props}/>
                        <div style={{ clear: 'both' }}></div>
                    </Fragment>
                );
            }
            else {
                return (
                    <div>
                        <Spinner />
                        <h1>Loading...</h1>
                        <h1>chat</h1>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                    <div>Please log in to chat!</div>
                    <Link to="/login">Login</Link>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);