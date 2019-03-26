import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import mainReducer from "../dux/mainReducer.js";

import sagas from "../dux/sagas/rootSaga.js";

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// For web extension

// This module exports a function.  So the returns a function, so the sagaMiddleware.run()
// call has to be inside that function so it runs when the function is run.
const configureStore = initialState => {
  const store = createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(sagas);
  return store;
};
/* eslint-enable */

export default configureStore;
