import React from 'react';
import Helmet from 'react-helmet';

const Header = ({ title }) => (
  <Helmet
    meta={[{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }]}
    defaultTitle={title}
    titleTemplate={`${title} | %s`}
    script={[{
      type: 'text/javascript',
      src: 'https://use.typekit.net/wie4qln.js'
    }, {
      type: 'text/javascript',
      innerHTML: 'try{Typekit.load({ async: true });}catch(e){}'
    }]}
  />
);

export default Header;
