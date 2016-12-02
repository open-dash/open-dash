import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col } from '../components/ui';

const LoginLayout = ({ content }) => (
  <div className='login-page'>
    <Helmet
      meta={[{
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }]}
      defaultTitle='HomeDash | Login'
      titleTemplate='HomeDash | %s'
      script={[{
        type: 'text/javascript',
        src: 'https://use.typekit.net/wie4qln.js'
      }, {
        type: 'text/javascript',
        innerHTML: 'try{Typekit.load({ async: true });}catch(e){}'
      }]}/>
    <Row className='center-md'>
      <Col md={4}>
        {content()}
      </Col>
    </Row>
  </div>
);

export default LoginLayout;
