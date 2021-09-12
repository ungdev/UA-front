import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../modules';
import { nodeEnv } from '../utils/environment';

const exempleInitialState = {};
const enhancers = [];
const middleware = [thunk];

if (nodeEnv() === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

const setupStore = (initialState = exempleInitialState) => {
  const store = createStore(rootReducer, initialState, composedEnhancers);

  if (nodeEnv() !== 'production') {
    if (module.hot) {
      module.hot.accept('../modules', () => {
        const nextRootReducer = require('../modules');
        store.replaceReducer(nextRootReducer, store.state);
      });
    }
  }

  return store;
};

export default setupStore;
