import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './app/store'
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store}>
        <App/>
    </Provider>
  </React.StrictMode>
);


