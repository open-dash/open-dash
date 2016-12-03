import React, { PropTypes } from 'react';
import Head from '../components/head';
import Alert from 'react-s-alert';

const PanelLayout = ({ content, siteTitle }) => {

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
      <Head title={siteTitle}/>
      <div id='panel-wrapper'>
        {content()}
        <Alert {...alertsConfig}/>
      </div>
    </main>
  );
};

PanelLayout.propTypes = {
  content: PropTypes.func.isRequired,
  siteTitle: PropTypes.string.isRequired
};

export default PanelLayout;
