import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Col from './col';

class Tile extends React.Component {

  render() {
    const classes = classNames(this.props.className, 'tile');
    const props = _.omit(this.props, ['className', 'children']);

    const styles = {};

    if (this.props.color) {
      styles.backgroundColor = this.props.color;
    }

    return (
      <Col
        xs={6}
        sm={4}
        md={3}
        lg={2}
        style={styles}
        className={classes}
        {...props}>
        <div className='tile-content'>
          {this.props.children}
        </div>
      </Col>
    );
  }
}

export default Tile;
