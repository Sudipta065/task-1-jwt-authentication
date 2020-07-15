import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

class Private extends Component {
  componentDidMount() {
    try {
      const token = localStorage.getItem('jwt-token');
      const expiry = jwtDecode(token).exp;
      const now = new Date();
      if (now.getTime() > expiry * 1000) {
        localStorage.removeItem('jwt-token');
        this.props.history.push('/');
      }
    } catch {
      localStorage.removeItem('jwt-token');
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className='container mt-5'>
        {}
        <h2>
          You have logged in your Account. Your authorization is complete...
        </h2>
        <Link
          className='btn btn-dark'
          to='/'
          onClick={() => {
            localStorage.removeItem('jwt-token');
          }}
        >
          Log Out
        </Link>
      </div>
    );
  }
}

export default withRouter(Private);

