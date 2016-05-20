import React from 'react';
import Helmet from 'react-helmet';
import { Row, Tile } from './ui';

class Dashboard extends React.Component {

  handleDeviceToggle(id) {
    const { onDeviceToggle } = this.props;
    onDeviceToggle(id);
  }

  render() {
    const { devices } = this.props;

    return (
      <div className='dashboard-page'>
        <Helmet title='Dashboard' />
        <Row>
          {devices.map((device) => (
            <Tile
              key={device.id}
              onClick={this.handleDeviceToggle.bind(this, device.id)}
              className={device.power}>
              <h2>{device.label}</h2>
              <div className='text-capitalize'>{device.power}</div>
            </Tile>
          ))}
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  devices: React.PropTypes.array.isRequired,
  onDeviceToggle: React.PropTypes.func.isRequired
};

export default Dashboard;
