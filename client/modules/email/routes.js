import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from '/client/modules/core/containers/main_layout';
import EmailSettings from './containers/email_settings';


export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/email', {
    name: 'email_settings',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<EmailSettings />)
      });
    }
  });
}
