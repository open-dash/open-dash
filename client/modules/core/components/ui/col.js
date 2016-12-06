import React, { Component } from 'react';

class Col extends Component {

  constructor(props) {
    super(props);

    this._classMap = {
      xs: 'col-xs',
      sm: 'col-sm',
      md: 'col-md',
      lg: 'col-lg',
      xsOffset: 'col-xs-offset',
      smOffset: 'col-sm-offset',
      mdOffset: 'col-md-offset',
      lgOffset: 'col-lg-offset'
    };
  }

  render() {
    const classes = [];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.reverse) {
      classes.push('reverse');
    }

    for (const key in this.props) {
      if (this.props.hasOwnProperty(key) && this._classMap[key]) {
        let colBaseClass = this._classMap[key];
        colBaseClass = Number.isInteger(this.props[key]) ? (colBaseClass + '-' + this.props[key]) : colBaseClass;
        classes.push(colBaseClass);
      }
    }

    const props = _.omit(this.props, ['className', 'children']);

    return (
      <div className={classes.join(' ')} {...props} >
        {this.props.children}
      </div>
    );
  }
}

const ModificatorType = React.PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.bool
]);

Col.propTypes = {
  xs: ModificatorType,
  sm: ModificatorType,
  md: ModificatorType,
  lg: ModificatorType,
  xsOffset: React.PropTypes.number,
  smOffset: React.PropTypes.number,
  mdOffset: React.PropTypes.number,
  lgOffset: React.PropTypes.number,
  reverse: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.node
};

export default Col;
