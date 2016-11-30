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
          {devices.map((device) => {
            let style = {};

            if (device.power === 'on') {
              const h = device.color.hue;
              const s = device.color.saturation;
              const l = device.brightness;
              style.background = `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
            }

            return (
              <Tile
                key={device.id}
                onClick={this.handleDeviceToggle.bind(this, device.id)}
                className={device.power}
                style={style}>
                <h2>{device.label}</h2>
                <div className='text-capitalize'>{device.power}</div>
              </Tile>
            );
          })}
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
