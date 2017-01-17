import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from '/client/modules/core/containers/main_layout';
import JobsList from './containers/jobs_list';

export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/jobs', {
    name: 'jobs_list',
    action(params, queryParams) {
      if (!queryParams.limit) {
        FlowRouter.setQueryParams({ limit: null });
      }
      mount(MainLayoutCtx, {
        content: () => (<JobsList limit={queryParams.limit} />)
      });
    }
  });
}
