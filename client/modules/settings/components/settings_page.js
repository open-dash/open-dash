import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
import AppSettings from '../containers/app_settings';
import EmailSettings from '/client/modules/email/containers/email_settings';

const SettingsPage = () => (
  <Grid className='settings-page'>
    <Helmet title='Admin Settings' />
    <Row>
      <Col md={6}>
        <AppSettings/>
      </Col>
      <Col md={6}>
        <EmailSettings/>
      </Col>
    </Row>
  </Grid>
);

export default SettingsPage;
