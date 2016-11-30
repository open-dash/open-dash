import React from 'react';
import SideNav from '../containers/side_nav';
import Alert from 'react-s-alert';
import Header from '../components/header';

class MainLayout extends React.Component {

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
        <Header title={siteTitle}/>
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

MainLayout.propTypes = {
  siteTitle: React.PropTypes.string.isRequired
};

export default MainLayout;
