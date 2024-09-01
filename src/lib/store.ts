// eslint-disable-next-line import/named
import { configureStore, type UnknownAction } from '@reduxjs/toolkit';
import { type ThunkAction, thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '@/modules';
import { nodeEnv } from '@/utils/environment';

const middleware = [thunk];

if (nodeEnv() === 'development') {
  middleware.push(createLogger({ collapsed: true }) as never);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
  devTools: nodeEnv() === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;
