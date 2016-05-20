import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from '/client/modules/core/containers/main_layout';
import UsersList from './containers/users_list';
import UserPage from './containers/user_page';
import InviteAccept from './containers/invite_accept';

export default function(injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/users', {
    name: 'users_list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<UsersList />)
      });
    }
  });

  FlowRouter.route('/users/:id', {
    name: 'user_account',
    action({ id }) {
      mount(MainLayoutCtx, {
        content: () => (<UserPage id={id} />)
      });
    }
  });

  FlowRouter.route('/invite/:token', {
    name: 'invite_accept',
    action({ token }) {
      mount(MainLayoutCtx, {
        content: () => (<InviteAccept token={token} />)
      });
    }
  });

}
