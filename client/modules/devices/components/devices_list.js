import React, { PropTypes } from 'react';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';
import Loading from '/client/modules/core/components/loading';

const DevicesList = ({ devices, waitingOnProviders }) => (
  <Grid fluid>
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
            :
            <div>
              {waitingOnProviders ?
              <div className='text-center'>
                <h4>Checking providers...</h4>
                <Loading/>
              </div>
              :
              <div className='text-center'>
                <h4>No devices found!</h4>
                <p>Head <a href='/'>back to the dashboard</a> to set up a provider.</p>
              </div>}
            </div>
          }
        </Panel>
      </Col>
    </Row>
  </Grid>
);

DevicesList.propTypes = {
  devices: PropTypes.array,
  waitingOnProviders: PropTypes.bool.isRequired
};

export default DevicesList;
