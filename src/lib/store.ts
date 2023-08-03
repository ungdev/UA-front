// eslint-disable-next-line import/named
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '@/modules';
import { nodeEnv } from '@/utils/environment';

const enhancers: unknown[] = [];
const middleware = [thunk];

if (nodeEnv() === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  enhancers: [composedEnhancers],
  devTools: nodeEnv() === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
