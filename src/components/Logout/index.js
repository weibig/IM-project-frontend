import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import userAPI from '../../api/userAPI';
import { isLogin } from '../../utils';

export default class Logout extends Component {
  componentDidMount() {
    this.userLogout();
  }

  async userLogout() {
    await userAPI.logout();

    localStorage.removeItem('authToken');
    localStorage.removeItem('session_id');
    localStorage.removeItem('userId');
    localStorage.removeItem('authType');
    localStorage.removeItem('_id');
    localStorage.removeItem('username');

    window.location.href = '/';
  }

  render() {
    if (!isLogin()) {
      return <Redirect to="/" />;
    }

    return null;
  }
}
