import React from 'react';
import { Grid, Row, Col, Panel, Table, Button, ButtonToolbar } from 'react-bootstrap';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false
    };
  }

  togglePasswordForm() {
    this.setState({
      showPasswordForm: !this.state.showPasswordForm
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
        <Row>
          <Col md={12}>
            <Panel>
              <Row>
                <Col md={6}>
                  <ul className='list-unstyled'>
                    <li><strong>Username:</strong> {user.username}</li>
                    <li><strong>Email:</strong> {user.emails[0].address}</li>
                  </ul>
                </Col>
                {canEdit ?
                  <Col md={5} mdOffset={1}>
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

UserPage.propTypes = {
  canEdit: React.PropTypes.bool,
  error: React.PropTypes.string,
  user: React.PropTypes.object
};

export default UserPage;
