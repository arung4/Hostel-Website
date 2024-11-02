import React, { StrictMode } from 'react'
import { createRoot,react} from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor= persistStore(store);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* <Toaster /> */}
    </PersistGate>
  </Provider>
</React.StrictMode>,
)
