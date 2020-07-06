import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'


const store = createStore(reducer)

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root')
);
