import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Panel, Button, ButtonToolbar } from 'react-bootstrap';

class UserPage extends Component {

  static propTypes = {
    canEdit: React.PropTypes.bool.isRequired,
    changeEmail: React.PropTypes.func.isRequired,
    changePassword: React.PropTypes.func.isRequired,
    emailError: React.PropTypes.string,
    passwordError: React.PropTypes.string,
    user: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      showEmailForm: false,
      showPasswordForm: false
    };
  }

  toggleEmailForm() {
    this.setState({
      showEmailForm: !this.state.showEmailForm
    });
  }

  togglePasswordForm() {
    this.setState({
      showPasswordForm: !this.state.showPasswordForm
    });
  }

  updateEmail(e) {
    e.preventDefault();
    const { changeEmail } = this.props;
    const { email } = this.refs;

    changeEmail(email.value, (error) => {
      if (!error) {
        this.toggleEmailForm();
      }
    });
  }

  updatePassword() {
    const { changePassword } = this.props;
    const { oldPass, newPass1, newPass2 } = this.refs;

    changePassword(oldPass.value, newPass1.value, newPass2.value, (error) => {
      if (!error) {
        this.togglePasswordForm();
      }
    });
  }

  renderError(error) {
    return (
      <div className='error text-center'>
        {error}
      </div>
    );
  }

  renderEmail() {
    const { canEdit, emailError, user } = this.props;
    return (
      <div>
        {this.state.showEmailForm ?
          <form onSubmit={this.updateEmail.bind(this)}>
            <div className='input-group' style={{ marginTop: '.5em' }}>
              <input
                type='text'
                ref='email'
                className='form-control'
                defaultValue={user.emails[0].address}/>
              <span className='input-group-btn'>
                <Button onClick={this.updateEmail.bind(this)}>Save</Button>
                <Button onClick={this.toggleEmailForm.bind(this)}>Cancel</Button>
              </span>
            </div>
            {emailError ? <span className='error'>{emailError}</span> : null}
          </form>
          :
          <div>
            <strong>Email:</strong> {user.emails[0].address}
            {canEdit ?
              <span
                className='change-email'
                onClick={this.toggleEmailForm.bind(this)}>
                change
              </span>
              : null
            }
          </div>
        }
      </div>
    );
  }

  renderChangePasswordForm() {
    const { error } = this.props;

    return (
      <div>
        <h4 className='text-center'>Change Password</h4>
        <hr/>
        <form onSubmit={this.updatePassword.bind(this)}>
          {error ? this.renderError(error) : null}
          <div className='form-group'>
            <label>Old Password</label>
            <input
              type='password'
              ref='oldPass'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label>New Password</label>
            <input
              type='password'
              ref='newPass1'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label>New Password (again)</label>
            <input
              type='password'
              ref='newPass2'
              className='form-control'
            />
          </div>
          <ButtonToolbar>
            <Button onClick={this.togglePasswordForm.bind(this)}>
              Cancel
            </Button>
            <Button bsStyle='primary' onClick={this.updatePassword.bind(this)}>
              Submit
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }

  render() {
    const { user, canEdit } = this.props;

    return (
      <Grid>
        <Helmet title={`User - ${user.username}`} />
        <Row>
          <Col md={12}>
            <Panel>
              <Row>
                <Col md={5}>
                  <ul className='list-unstyled'>
                    <li><strong>Username:</strong> {user.username}</li>
                    <li>{this.renderEmail()}</li>
                  </ul>
                </Col>
                {canEdit ?
                  <Col md={5} mdOffset={2}>
                    {this.state.showPasswordForm
                      ? this.renderChangePasswordForm()
                      : <Button onClick={this.togglePasswordForm.bind(this)}>
                          Change Password
                        </Button>}
                  </Col>
                  : null}
              </Row>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default UserPage;
