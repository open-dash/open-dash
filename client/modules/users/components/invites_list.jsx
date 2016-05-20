import React from 'react';
import { Grid, Row, Col, Panel, Table, Button } from 'react-bootstrap';
import InviteNew from '../containers/invite_new';
import moment from 'moment';

class InvitesList extends React.Component {

  handleRevokeInvite(id) {
    const { revokeInvite } = this.props;
    revokeInvite(id);
  }

  render() {
    const { invites, canRevoke } = this.props;

    return (
      <Row>
        <Col sm={10} smOffset={1}>
          <Panel>
            <Row>
              <Col sm={12}>
                <h3>Pending Invites</h3>
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
                              {moment(invite.createdAt).format('LLL')}
                              <small>({moment(invite.createdAt).fromNow()})</small>
                            </td>
                            <td>
                              {canRevoke ?
                                <Button
                                  bsStyle='danger'
                                  className='revoke-invite'
                                  onClick={this.handleRevokeInvite.bind(this, invite._id)}>
                                  Revoke
                                </Button>
                                : null}
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
