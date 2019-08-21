import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../Layout/Logo/Logo';

import * as actions from '../../store/actions';
import { connect } from 'react-redux';

const FormWrap = styled.div`
    width: 50%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 1%;
    
    .form-group{
        font-size: 25px;
        text-align: left;
    }

    button{
        width: 100%;
        font-size: 25px;
        
    }
`;
const Message = styled.div`
    width: 50%;
    margin 0 auto;
    background-color: #ccc;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 20px;
    a{
        text-decoration: none;
    }

    a:hover{
        text-decoration: none;
        color: white;
    }
`;

const LoginErrorMessage = styled.div`
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

const initialState = {
    username: '',
    password: '',
    usernameEmptyError: '',
    passwordEmptyError: '',
    loginError: ''
}

class Login extends Component {

    state = {
        username: '',
        password: '',
        usernameEmptyError: '',
        passwordEmptyError: '',
        loginError: '',
        loading: false
    };

    inputChangedHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        this.setState(initialState);
    }

    validateForm = () => {

        let usernameEmptyError = '';
        let passwordEmptyError = '';

        if (!this.state.username) {
            usernameEmptyError = 'Please enter your username!';
        }
        if (!this.state.password) {
            passwordEmptyError = 'Please enter your password!';
        }

        if (usernameEmptyError) {
            this.setState({ usernameEmptyError: usernameEmptyError });
            return false;
        }
        if (passwordEmptyError) {
            this.setState({ passwordEmptyError: passwordEmptyError });
            return false;
        }
        return true;
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const userCredentials = {
                username: this.state.username,
                password: this.state.password
            }

            this.props.onAuth(userCredentials);           

            this.setState(initialState);
        }
    }

    render() {
        const { username, password } = this.state;
        let loginRedirect = null;
        if(this.props.isAuthenticated){
            loginRedirect = <Redirect to='/chat'/>
        }
        return (
            <Fragment>
                {loginRedirect}
                <Link to="/"><Logo height="100px"/></Link>
                <FormWrap>
                    <h2>Login</h2>
                    <Form onSubmit={this.formSubmitHandler}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={this.inputChangedHandler} placeholder="Enter your username" value={username} />
                            {this.state.usernameEmptyError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.usernameEmptyError}</span> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={this.inputChangedHandler} placeholder="Enter your password" value={password} />
                            {this.state.passwordEmptyError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.passwordEmptyError}</span> : null}
                        </Form.Group>
                        <Button variant="info" type="submit">Submit</Button>
                    </Form>
                </FormWrap>
                {this.props.loginError ? <LoginErrorMessage>{this.props.loginError}</LoginErrorMessage> : null}
                <Message>
                    <h4>Don't have an account yet? <Link to="/register">Register</Link></h4>
                </Message>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        loginError: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (userCredentials) => dispatch(actions.auth(userCredentials))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);