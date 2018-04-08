// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';

// stores
import UiStore from './UiStore';
import AppStore from './AppStore';

export const ui = new UiStore();
export const app = new AppStore();

const stores = { ui, app };
window.stores = stores;

const StoreProvider = ({ children }: { children: React.Node }) => (
  <Provider {...stores}>{children}</Provider>
);

export default StoreProvider;
