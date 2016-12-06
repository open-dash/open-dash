import React, { PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Col } from 'react-bootstrap';

const Tile = (allProps) => {
  const classes = classNames(allProps.className, 'tile');
  const props = _.omit(allProps, ['className', 'children']);

  const styles = {};

  if (props.color) {
    styles.backgroundColor = props.color;
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
        {allProps.children}
      </div>
    </Col>
  );
};

Tile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.element
};

export default Tile;
