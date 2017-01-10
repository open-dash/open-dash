import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import SmartThingsConnect from '/client/modules/smartthings/containers/connect';

const Dashboard = () => (
  <div>
    <Helmet title='Dashboard'/>
    <Grid fluid>
      <SmartThingsConnect />
    </Grid>
  </div>
);

export default Dashboard;
