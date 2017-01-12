import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Head = ({ title }) => (
  <Helmet
    defaultTitle={title}
    titleTemplate={`${title} | %s`}
    meta={[
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ]}
    script={[
      {
        type: 'text/javascript',
        src: 'https://use.typekit.net/yaa3wrc.js'
      },
      {
        type: 'text/javascript',
        innerHTML: 'try{Typekit.load({ async: true });}catch(e){}'
      }
    ]}/>
);

Head.propTypes = {
  title: PropTypes.string.isRequired
};

export default Head;
