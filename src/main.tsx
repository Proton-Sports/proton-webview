import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import RouterProvider from './lib/components/RouterProvider.tsx';

if (!('alt' in globalThis)) {
  globalThis.alt = {
    isBrowser: true,
    emit() {},
    getBranch() {
      return '';
    },
    getEventListeners() {
      return [];
    },
    getLocale() {
      return '';
    },
    getVersion() {
      return '';
    },
    off() {},
    on() {},
    once() {},
    getPermissionState() {
      return false;
    },
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
