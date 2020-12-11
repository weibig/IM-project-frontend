import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import userAPI from '../../api/userAPI';
import { isLogin } from '../../utils';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    const form = e.target;
    const data = {
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
    };
    await userAPI
      .register(data)
      .then((res) => {
        const rd = res.data;
        console.log(rd);
        window.location.href = '/login';
      })
      .catch((err) => {
        alert('Register Failed!');
        console.error(err);
      });
  }

  render() {
    if (isLogin()) {
      return <Redirect to="/" />;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
          <Form.Text muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="haveAcceptedTerms">
          <Form.Check
            required
            type="checkbox"
            label="I have accepted the terms."
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
