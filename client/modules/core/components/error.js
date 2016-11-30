import React from 'react';

const CustomError = ({error}) => (
  <div style={{ color: 'red', textAlign: 'center' }}>
    {error.message}
  </div>
);

export default CustomError;
