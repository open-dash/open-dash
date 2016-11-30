import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, info, label, help, children, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props}>
      {children}
    </FormControl>
    {info && <div className='info-text'>{info}</div>}
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

FieldGroup.propTypes = {
  children: PropTypes.node,
  help: PropTypes.node,
  id: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string
};

export default FieldGroup;
