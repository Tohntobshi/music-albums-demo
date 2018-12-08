import { createStore, applyMiddleware, compose, Action } from "redux";
import { createEpicMiddleware } from "redux-observable";
import reducers, { INITIAL_STATE } from "./reducers";
import epics from "./epics";

const epicMiddleware = createEpicMiddleware<any, any, any, any>();

export const store = createStore(
  reducers,
  INITIAL_STATE,
  compose(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(epics);

// store.subscribe(() => {
//   console.log(store.getState());
// });
