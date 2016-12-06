import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Row } from 'react-bootstrap';
import { Tile } from '/client/modules/core/components/ui';

class Panel extends Component {

  static propTypes = {
    devices: PropTypes.array.isRequired,
    onDeviceToggle: PropTypes.func.isRequired
  }

  handleDeviceToggle(id) {
    const { onDeviceToggle } = this.props;
    onDeviceToggle(id);
  }

  render() {
    const { devices } = this.props;

    return (
      <div className='dashboard-page'>
        <Helmet title='Panel' />
        <Row>
          {devices.map((device) => {
            const style = {};

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

export default Panel;
