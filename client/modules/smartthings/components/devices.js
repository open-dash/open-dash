import React, { PropTypes } from 'react';
// import { Panel, Button } from 'react-bootstrap';

const SmartThingsDevices = ({ devices }) => (
  <div>
    <pre>
      {JSON.stringify(devices, null, 2)}
    </pre>
  </div>
);

SmartThingsDevices.propTypes = {
  devices: PropTypes.array
};

export default SmartThingsDevices;
