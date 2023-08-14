'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';

export function Providers({ children, persisted = false }: { children: React.ReactNode; persisted?: boolean }) {
  return (
    <Provider store={store}>
      {persisted ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
