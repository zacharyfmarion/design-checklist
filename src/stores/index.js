// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';

// stores
import UiStore from './UiStore';
import AppStore from './AppStore';

// instantiate the stores as singletons
export const ui = new UiStore();
export const app = new AppStore();

const stores = { ui, app };

// also attach the stores to the window object for debugging purposes
if (process.env.NODE_ENV === 'development') {
  window.stores = stores;
}

// Create a simple component wrapper that passes the stores to the
// mobx provider and renders the children in the context of the Provider
const StoreProvider = ({ children }: { children: React.Node }) => (
  <Provider {...stores}>{children}</Provider>
);

export default StoreProvider;
