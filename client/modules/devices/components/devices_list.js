import React, { PropTypes } from 'react';
import { Row, Col, Panel, Table } from 'react-bootstrap';

const DevicesList = ({ devices }) => (
  <Row>
    <Col md={12}>
      <Panel>
        <h3 className='text-center'>Devices</h3>
        <hr/>
        {devices.length > 0 ?
          <Table bordered responsive>
            <thead>
              <tr>
                <th/>
                <th>Name</th>
                <th>Type</th>
                <th>Label</th>
                <th>Provider</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, i) => (
                <tr key={i}>
                  <td><a href={`/devices/${device._id}`}>View</a></td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.label}</td>
                  <td>{device.provider}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          : <h4 className='text-center'>No devices found!</h4>}
      </Panel>
    </Col>
  </Row>
);

DevicesList.propTypes = {
  devices: PropTypes.array
};

export default DevicesList;
