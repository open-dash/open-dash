import React from 'react';
import { mount } from 'react-mounter';
import PanelLayout from '/client/modules/core/containers/panel_layout';
import Panel from './containers/panel';

export default function (injectDeps, { FlowRouter }) {
  const PanelLayoutCtx = injectDeps(PanelLayout);

  FlowRouter.route('/panel', {
    name: 'panel',
    action() {
      mount(PanelLayoutCtx, {
        content: () => (<Panel />)
      });
    }
  });
}
