import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from '/client/modules/core/containers/main_layout';
import PanelLayout from '/client/modules/core/containers/panel_layout';
import Loading from '/client/modules/core/components/loading';
import SmartThingsDashboard from './containers/dashboard';


export default function (injectDeps, { FlowRouter, Meteor, Alert }) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const PanelLayoutCtx = injectDeps(PanelLayout);

  FlowRouter.route('/auth/smartthings', {
    name: 'smartthings_auth',
    action(params, queryParams) {
      mount(PanelLayoutCtx, {
        content: () => (<Loading />)
      });

      const { code } = queryParams;

      if (!code) {
        FlowRouter.go('/');
        Alert.error({ text: 'Looks like something went wrong with SmartThings.' });
      } else {
        Meteor.call('smartthings/auth/getToken', code, (err) => {
          FlowRouter.go('/');
          if (err) {
            Alert.error({ text: err.reason });
          } else {
            Alert.success({ text: 'Connected to SmartThings!' });
          }
        });
      }
    }
  });

  FlowRouter.route('/smartthings', {
    name: 'smartthings',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<SmartThingsDashboard />)
      });
    }
  });
}
