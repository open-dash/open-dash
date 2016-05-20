import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class InviteNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errors: null
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  sendInvite(e) {
    e.preventDefault();

    const { sendInvite } = this.props;
    const { email } = this.refs;

    if (!email.value) {
      this.setState({ error: 'Please choose an email.' });
      return;
    }

    sendInvite(email.value);
    this.setState({ showModal: false });
  }

  clearError() {
    this.setState({ error: null });
  }

  renderError(error) {
    return (
      <div className='error'>
        {error}
      </div>
    );
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <Button
          bsStyle='primary'
          bsSize = 'large'
          onClick={this.toggleModal.bind(this)}>
          Send Invitation
        </Button>

        <Modal show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Send Invitation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id='send-invite-form' onSubmit={this.sendInvite.bind(this)}>
              <div className='form-group'>
                <label>Email address</label>
                {error ? this.renderError(error) : null}
                <input
                  ref='email'
                  type='email'
                  className='form-control'
                  name='invite-user-email'
                  onChange={this.clearError.bind(this)}/>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this)}>Close</Button>
            <Button
              bsStyle='primary'
              onClick={this.sendInvite.bind(this)}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InviteNew;
