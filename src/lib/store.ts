// eslint-disable-next-line import/named
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from '@/modules';
import { nodeEnv } from '@/utils/environment';

const enhancers: [] = [];
const middleware = [thunk];

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

const persistConfig = {
  key: 'root',
  storage: storage,
}

if (nodeEnv() === 'development') {
  middleware.push(createLogger({ collapsed: true }) as never);
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  enhancers: [composedEnhancers],
  devTools: nodeEnv() === 'development',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
