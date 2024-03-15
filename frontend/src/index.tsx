import React from 'react';
import { Root, hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './normalize.css';
import './App.sass';

const container: HTMLElement = document.getElementById('root') as HTMLElement;

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
  const root: Root = hydrateRoot(
  container, (
  <React.StrictMode>
  <App />
  </React.StrictMode>
  ));
*/