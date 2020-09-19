import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './modules';

// TODO: create type State
export const initStore = (initialState: any) => {
  const logger = createLogger({ collapsed: true });
  return createStore(reducer, initialState, applyMiddleware(thunk, logger));
};
