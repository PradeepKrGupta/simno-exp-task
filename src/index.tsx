// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FormProvider } from './context/FormContext';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
);
