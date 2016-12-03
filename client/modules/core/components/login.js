import React from 'react';
import Helmet from 'react-helmet';
import { Col } from 'react-bootstrap';
import { Accounts } from 'meteor/jeremy:react-accounts-ui';

const Login = () => (
  <div>
    <Helmet title='Login' />
    <Col md={6} mdOffset={3}>
      <Accounts.UI.LoginForm />
    </Col>
  </div>
);

export default Login;
