import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function ValidationMessage(props) {
  if (!props.valid) {
    return <div className='error-msg error'>{props.message}</div>;
  }
  return null;
}
export default class Login extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false;

    this.state = {
      email: '',
      password: '',
      loggedIn,
      errorMessage: null,
      emailValid: false,
      errorMsg: {},
    };
  }

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = 'Invalid email format';
    }

    //

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    let { email, password } = this.state;

    axios
      .post(
        'https://admin.barikoi.xyz:8090/auth/login',
        {
          email: email,
          password: password,
        }
        /* {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }*/
      )
      .then((response) => {
        console.log(response.data);

        if (response.data.success === true) {
          localStorage.setItem(
            'jwt-token',
            JSON.stringify({
              token: response.data.data,
            })
          );
          this.setState({ loggedIn: true });
        } else {
          this.setState({ errorMessage: response.data.message });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to='/private' />;
    } else
      return (
        <div className='container'>
          <h3>Log In</h3>
          <form className='form' onSubmit={this.submitForm}>
            <div className='form-group'>
              <label className='mr-5'>Email</label>
              <input
                className='form-control'
                type='email'
                placeholder='Email'
                name='email'
                value={this.state.email}
                onChange={(e) => {
                  this.onChange(e);
                  this.updateEmail(e.target.value);
                }}
              />
              <ValidationMessage
                valid={this.state.emailValid}
                message={this.state.errorMsg.email}
              />
            </div>
            <br />
            <div className='form-group'>
              <label className='mr-5'>Password</label>
              <input
                className='form-control'
                type='password'
                placeholder='Password'
                name='password'
                value={this.state.password}
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Log In' />
          </form>
          <div className='mt-5'>{this.state.errorMessage}</div>
        </div>
      );
  }
}
