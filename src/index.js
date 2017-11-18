import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Astro from './Astro';
import registerServiceWorker from './registerServiceWorker';

// Reducers
import astroReducer from './reducers/astroReducer'

const store = createStore(astroReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Astro store={store} />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
