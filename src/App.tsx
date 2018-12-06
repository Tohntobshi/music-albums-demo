import * as React from "react";
import { Provider } from "react-redux";
import { Navigator } from "./navigation";
import { store } from "./redux/store";

export const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
