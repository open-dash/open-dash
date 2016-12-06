import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

const Grid = () => {
  const containerClass = this.props.fluid ? 'container-fluid' : 'container';
  const classes = classNames(this.props.className, containerClass);
  const props = _.omit(this.props, ['className', 'children']);

  return (
    <div className={classes} {...props} >
      {this.props.children}
    </div>
  );
};

Grid.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fluid: React.PropTypes.bool
};

export default Grid;
