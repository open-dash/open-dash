import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import Head from '../components/head';

const styles = {
  marginTop: '5%'
};

const LoginLayout = ({ content, siteTitle }) => (
  <Grid style={styles}>
    <Head title={siteTitle} />
    {content()}
  </Grid>
);

LoginLayout.propTypes = {
  content: PropTypes.func.isRequired,
  siteTitle: PropTypes.string.isRequired
};

export default LoginLayout;
