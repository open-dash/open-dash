import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class InviteAccept extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const { acceptInvite, invite } = this.props;
    const { username, password, password2 } = this.refs;
    const options = {
      username: username.value,
      email: invite.email,
      password: password.value,
      password2: password2.value
    };
    acceptInvite(options);
  }

  renderSignupForm(invite) {
    const { error } = this.props;

    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <Panel>
            <h4 className='text-center'>Please choose a password.</h4>
            {error ? <div className='error text-center'>{error}</div> : null}
            <form className='sign-up-form' onSubmit={this.handleSubmit.bind(this)}>
              <div className='form-group'>
                <label>Username</label>
                <input ref='username' type='text' className='form-control' autofocus />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input ref='email' type='email' className='form-control' value={invite.email} disabled />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input ref='password' type='password' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Password (again)</label>
                <input ref='password2' type='password' className='form-control' />
              </div>
              <Button type='submit' className='pull-right' onClick={this.handleSubmit.bind(this)}>
                Let's go!
              </Button>
            </form>
          </Panel>
        </Col>
      </Row>
    );
  }

  renderInviteUsed() {
    return (
      <Row>
        <Col md={8} mdOffset={2}>
          <Panel>
            <h5 className='text-center'>
              Oops, looks like this invite has already been used.
            </h5>
          </Panel>
        </Col>
      </Row>
    );
  }

  renderLinkInvalid() {
    return (
      <Row>
        <Col md={8} mdOffset={2}>
          <Panel>
            <h5 className='text-center'>
              Sorry, this link is not valid.
            </h5>
          </Panel>
        </Col>
      </Row>
    );
  }

  render() {
    const { invite } = this.props;

    if (!invite) {
      return this.renderLinkInvalid();
    }

    if (invite.accepted) {
      return this.renderInviteUsed();
    }

    return this.renderSignupForm(invite);
  }
}

InviteAccept.propTypes = {
  invite: React.PropTypes.object,
  error: React.PropTypes.string
};

export default InviteAccept;
