import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Redux store with middleware only (no devtools)
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
