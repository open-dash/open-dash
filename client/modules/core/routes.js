import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from './containers/main_layout';
import PanelLayout from './containers/panel_layout';
import LoginLayout from './containers/login_layout';
import Login from './components/login';
import Dashboard from './containers/dashboard';
import NotFound from './components/not_found';

export default function (injectDeps, { FlowRouter, Meteor }) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const PanelLayoutCtx = injectDeps(PanelLayout);
  const LoginLayoutCtx = injectDeps(LoginLayout);

  // Global subscriptions
  FlowRouter.subscriptions = function () {
    this.register('settings', Meteor.subscribe('settings'));
  };

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(PanelLayoutCtx, {
        content: () => (<Dashboard />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    action() {
      mount(LoginLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/logout', {
    name: 'logout',
    action() {
      Meteor.logout(() => FlowRouter.go('/login'));
    }
  });

  FlowRouter.notFound = {
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NotFound />)
      });
    }
  };

}
