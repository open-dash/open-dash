import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from '/client/modules/core/containers/main_layout';
import DevicesList from './containers/devices_list';
import DevicePage from './containers/device_page';


export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/devices', {
    name: 'devices',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<DevicesList />)
      });
    }
  });

  FlowRouter.route('/devices/:_id', {
    name: 'device_page',
    action({ _id }) {
      mount(MainLayoutCtx, {
        content: () => (<DevicePage _id={_id} />)
      });
    }
  });
}
