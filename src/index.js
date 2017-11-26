import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Astro from './Astro';
import registerServiceWorker from './registerServiceWorker';

// Reducers
import shipReducer from './reducers/shipReducer'

// Store
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <Astro store={store} />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();