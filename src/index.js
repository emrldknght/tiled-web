import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {disableDevTools} from "./lib/disableDevTools";
import {mAppState} from "./store/mStore";
import {StoreContext} from "./store/StoreContext";

// console.log('START IT!', process.env);
disableDevTools()

ReactDOM.render(
  <div>
    <StoreContext.Provider value={mAppState}>
      <App />
    </StoreContext.Provider>
  </div>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
