import React, { PropTypes } from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';

const SmartThingsConnect = ({ authUrl, smartthingsConnected }) => (
  <Row>
    <Col md={3}>
      <Panel>
        {smartthingsConnected &&
          <Row className='text-center' style={{ marginBottom: '2rem' }}>
            <h4>SmartThings Connected!</h4>
            <hr/>
            <a href='/smartthings'>View your devices</a>
          </Row>}

          <Row className='text-center'>
              <a href={authUrl}>
                {smartthingsConnected ?
                'Re-Authenticate with SmartThings' :
                <Button bsStyle='primary'>Connect to SmartThings</Button>}
              </a>
          </Row>
      </Panel>
    </Col>
  </Row>
);

SmartThingsConnect.propTypes = {
  authUrl: PropTypes.string.isRequired,
  smartthingsConnected: PropTypes.bool.isRequired
};

export default SmartThingsConnect;
