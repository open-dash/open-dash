import React, { PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';

const SmartThingsConnect = ({ authUrl, smartthingsConnected }) => (
  <Panel>
    {smartthingsConnected ?
      <div className='text-center'>
        <h4>SmartThings Connected!</h4>
        <hr/>
        <a href='/smartthings'>View your devices</a>
      </div>
      : <a href={authUrl}><Button bsStyle='primary'>Connect to SmartThings</Button></a>
    }
  </Panel>
);

SmartThingsConnect.propTypes = {
  authUrl: PropTypes.string.isRequired,
  smartthingsConnected: PropTypes.bool.isRequired
};

export default SmartThingsConnect;
