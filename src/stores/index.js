// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';

// stores
import UiStore from './UiStore';
import UserStore from './UserStore';

export const ui = new UiStore();
export const user = new UserStore();

window.stores = { ui, user };

const StoreProvider = ({ children }: { children: React.Node }) =>
  <Provider ui={ui} user={user}>
    {children}
  </Provider>;

export default StoreProvider;
