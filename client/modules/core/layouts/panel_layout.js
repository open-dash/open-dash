import React from 'react';
import Helmet from 'react-helmet';
import SideNav from '../components/side_nav';
import Alert from 'react-s-alert';

export const PanelLayout = ({ siteTitle, content }) => {

  const alertsConfig = {
    effect: 'jelly',
    position: 'bottom-right',
    timeout: 3000,
    html: true,
    onRouteClose: false,
    stack: true,
    offset: 0
  };

  return (
    <main className='app-root'>
      <Helmet
        meta={[{
          charset: 'utf-8'
        }, {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }]}
        defaultTitle={siteTitle}
        titleTemplate={`${siteTitle} | %s`}
        title='Dashboard'
        script={[{
          type: 'text/javascript',
          src: 'https://use.typekit.net/wie4qln.js'
        }, {
          type: 'text/javascript',
          innerHTML: 'try{Typekit.load({ async: true });}catch(e){}'
        }]}
      />
      <div id='panel-wrapper'>
        {content()}
        <Alert {...alertsConfig}/>
      </div>
    </main>
  );
};

export default PanelLayout;
