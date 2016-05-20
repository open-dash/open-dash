import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';

class Grid extends React.Component {
  render() {
    const containerClass = this.props.fluid ? 'container-fluid' : 'container';
    const classes = classNames(this.props.className, containerClass);
    const props = _.omit(this.props, ['className', 'children']);

    return (
      <div className={classes} {...props} >
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  fluid: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.node
};

export default Grid;
