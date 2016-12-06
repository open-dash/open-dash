import React, { Component, PropTypes } from 'react';
import { Row, Col, Panel, Table, Button } from 'react-bootstrap';
import InviteNew from '../containers/invite_new';
import format from 'date-fns/format';
import { default as fromNow } from 'date-fns/distance_in_words_to_now';

class InvitesList extends Component {

  static propTypes = {
    invites: PropTypes.array.isRequired,
    revokeInvite: PropTypes.func.isRequired
  }

  revoke(id) {
    const { revokeInvite } = this.props;
    revokeInvite(id);
  }

  render() {
    const { invites } = this.props;

    return (
      <Row>
        <Col sm={10} smOffset={1}>
          <Panel>
            <Row>
              <Col sm={12}>
                <h3>Invitations <small className='text-muted'>({'openInviteCount'})</small></h3>
                <hr/>
                <InviteNew />
                <br/>
              </Col>
            </Row>
            {invites.length > 0 ?
              <Row>
                <Col sm={12}>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Email Address</th>
                        <th>Type</th>
                        <th>Date Sent</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {invites.map((invite) => {
                        return (
                          <tr key={invite._id}>
                            <td>{invite.email}</td>
                            <td>{invite.role}</td>
                            <td>
                              {format(invite.createdAt, 'LLL')}
                              <small>({fromNow(invite.createdAt)})</small>
                            </td>
                            <td>
                              <Button
                                bsStyle='danger'
                                className='revoke-invite'
                                onClick={this.revoke.bind(this, invite._id)}>
                                Revoke
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              :
              <h3 className='text-center'>No open invitations.</h3>
            }
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default InvitesList;
