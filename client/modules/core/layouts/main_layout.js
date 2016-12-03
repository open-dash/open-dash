import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import SideNav from '../containers/side_nav';
import Head from '../components/head';

class MainLayout extends Component {

  static propTypes = {
    siteTitle: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarToggled: false
    };
  }

  toggleSidebar() {
    const { sidebarToggled } = this.state;
    this.setState({ sidebarToggled: !sidebarToggled });
  }

  render() {
    const { siteTitle } = this.props;

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
        <div id='dash-wrapper' className={this.state.sidebarToggled ? 'toggled' : null}>
          <SideNav/>
          <main id='dash-content-wrapper' className='main-content'>
            <button
              id='sidenav-toggle'
              className='btn btn-default'
              onClick={this.toggleSidebar}>
              Menu
            </button>
            {this.props.content()}
          </main>
          <Alert {...alertsConfig}/>
        </div>
      </main>
    );
  }
}

export default MainLayout;
