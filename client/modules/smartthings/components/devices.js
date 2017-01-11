import React, { PropTypes } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

const SmartThingsDevices = ({ devices }) => (
  <Row>
    <Col md={12}>
      {devices.length > 0 ?
        <Table bordered responsive>
          <thead>
            <tr>
              <th/>
              <th>Name</th>
              <th>Type</th>
              <th>Label</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, i) => (
              <tr key={i}>
                <td><a href={`/devices/${device._id}`}>View</a></td>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.label}</td>
                <td>{device.model}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        : <h4 className='text-center'>No devices found!</h4>}
      </Col>
  </Row>
);

SmartThingsDevices.propTypes = {
  devices: PropTypes.array
};

export default SmartThingsDevices;
