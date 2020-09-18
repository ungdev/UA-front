import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../modules';

const exempleInitialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const setupStore = (initialState = exempleInitialState) => {
  const store = createStore(rootReducer, initialState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production') {
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
