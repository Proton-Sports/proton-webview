import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import RouterProvider from './lib/contexts/router-context.tsx';

if (!('alt' in globalThis)) {
  globalThis.alt = {
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
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
