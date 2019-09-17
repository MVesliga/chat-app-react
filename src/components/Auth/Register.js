import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../Layout/Logo/Logo';
import axiosAuth from '../../axios-auth';
import md5 from 'md5';


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

const SmallInput = styled.div`
    width: 50%;
    padding: 10px;
    float: left;
`;

const RegistrationErrorMessage = styled.div`
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

// const initialState = {
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     password: '',
//     passwordConfirmation: '',
//     firstNameError: '',
//     lastNameError: '',
//     usernameError: '',
//     emailError: '',
//     passwordError: '',
//     passwordConfirmationError: '',
//     registrationError: '',
//     registered: false
// }

class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        firstNameError: '',
        lastNameError: '',
        usernameError: '',
        emailError: '',
        passwordError: '',
        passwordConfirmationError: '',
        registrationError: ''
    };

    inputChangedHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    validateForm = () => {
        let firstNameError = '';
        let lastNameError = '';
        let usernameError = '';
        let emailError = '';
        let passwordError = '';
        let passwordConfirmationError = '';

        if(this.state.firstName.length < 3){
            firstNameError = 'Your name can not be shorter than 3 characters.';
        }
        if(this.state.lastName.length < 3){
            lastNameError = 'Your name can not be shorter than 3 characters.';
        }
        if (this.state.username.length < 3) {
            usernameError = 'Username is to short. Please choose a username that contains min 3 characters.'
        }
        if (!this.state.email.includes('@')) {
            emailError = 'invalid email'
        }
        if (this.state.password.length < 5) {
            passwordError = 'Password is to short. Please choose a password that contains min 5 characters.'
        }
        if (this.state.passwordConfirmation !== this.state.password) {
            passwordConfirmationError = 'Passwords do not match! Please enter the same passwords.'
        }
        
        if (firstNameError) {
            this.setState({ firstNameError: firstNameError });
            return false;
        }
        if (lastNameError) {
            this.setState({ lastNameError: lastNameError });
            return false;
        }
        if (usernameError) {
            this.setState({ usernameError: usernameError });
            return false;
        }
        if (emailError) {
            this.setState({ emailError: emailError });
            return false;
        }
        if (passwordError) {
            this.setState({ passwordError: passwordError });
            return false;
        }
        if (passwordConfirmationError) {
            this.setState({ passwordConfirmationError: passwordConfirmationError });
            return false;
        }

        return true;
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
    
        if (this.validateForm()) {
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password, 
                imgUrl: `http://gravatar.com/avatar/${md5(this.state.email)}?d=identicon`
            }
            
            axiosAuth.post('/register', user).then(response => {
                console.log(response);
                this.setState({registered: true});  
            }).catch(error => {
                this.setState({registrationError: error.response.data});
                console.log(error);
            });

            //this.setState(initialState);
        }
    }

    

    render() {
        const { firstName, lastName, username, email, password, passwordConfirmation } = this.state;
        let redirectToLogin = null;
        if(this.state.registered){
            redirectToLogin = <Redirect to="/login"/>
        }
        return (
            <Fragment>
                {redirectToLogin}
                <Link to="/"><Logo height="100px"/></Link>
                <FormWrap>
                    <h2>Registration</h2>
                    <Form onSubmit={this.formSubmitHandler}>
                        <div>
                            <SmallInput>
                                <Form.Group >
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" name="firstName" onChange={this.inputChangedHandler} placeholder="Enter your first name" value={firstName}/>
                                    {this.state.firstNameError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.firstNameError}</span> : null}
                                </Form.Group>
                            </SmallInput>
                            <SmallInput>
                                <Form.Group >
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" name="lastName" onChange={this.inputChangedHandler} placeholder="Enter your last name" value={lastName}/>
                                    {this.state.lastNameError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.lastNameError}</span> : null}
                                </Form.Group>
                            </SmallInput>
                            <div style={{clear: 'both'}}></div>
                        </div>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={this.inputChangedHandler} placeholder="Enter your username" value={username} />
                            {this.state.usernameError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.usernameError}</span> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.inputChangedHandler} placeholder="Enter your email" value={email} />
                            {this.state.emailError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.emailError}</span> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={this.inputChangedHandler} placeholder="Enter your password" value={password} />
                            {this.state.passwordError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.passwordError}</span> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control type="password" name="passwordConfirmation" onChange={this.inputChangedHandler} placeholder="Repeat your password" value={passwordConfirmation} />
                            {this.state.passwordConfirmationError ? <span style={{ color: 'red', fontSize: 20 }}>{this.state.passwordConfirmationError}</span> : null}
                        </Form.Group>
                        <Button variant="info" type="submit">Submit</Button>
                    </Form>
                </FormWrap>
                {this.state.registrationError ? <RegistrationErrorMessage>{this.state.registrationError}</RegistrationErrorMessage> : null}
                <Message>
                    <h4>Already have an account? <Link to="/login">Login</Link></h4>
                </Message>
            </Fragment>
        );
    }
}

export default Register;