import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

const NotFound = () => (
  <Grid>
    <Row>
      <Col sm={12} md={4} mdOffset={4}>
        <Panel>
          <h1 className='text-center'>Oops! Nothing here.</h1>
          <a href='/' className='btn'>Go home</a>
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default NotFound;
