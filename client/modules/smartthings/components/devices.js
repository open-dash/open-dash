import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const SmartThingsDevices = ({ devices }) => (
  <Table bordered responsive>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Manufacturer</th>
        <th>Model</th>
      </tr>
    </thead>
    <tbody>
      {devices.map((device, i) => (
        <tr key={i}>
          <td>{device.name}</td>
          <td>{device.type}</td>
          <td>{device.manufacturer}</td>
          <td>{device.model}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

SmartThingsDevices.propTypes = {
  devices: PropTypes.array
};

export default SmartThingsDevices;
