import React, { PropTypes } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

const DevicePage = ({ device }) => (
  <Row>
    <Col md={8} mdOffset={2}>
      <Panel>
        <h3 className='text-center'>{device.name}</h3>
        <hr/>
        <div>
          <p><strong>Type</strong>: {device.type}</p>
          <p><strong>Attributes</strong>: {JSON.stringify(Object.keys(device.attributes))}</p>
          {device.commands && <p><strong>Commands</strong>: {JSON.stringify(device.commands)}</p>}
        </div>
      </Panel>
    </Col>
  </Row>
);

DevicePage.propTypes = {
  device: PropTypes.object
};

export default DevicePage;
