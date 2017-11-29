import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Astro from './Astro';
import registerServiceWorker from './registerServiceWorker';

// Store
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <Astro store={store} />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();