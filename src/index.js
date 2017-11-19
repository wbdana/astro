import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Astro from './Astro';
import registerServiceWorker from './registerServiceWorker';

// Reducers
import shipReducer from './reducers/shipReducer'





// TODO
// Link this to './store' and configure store there
// Combine reducers and import those to './store'
// Figure out how to direct specific actions to
//  the correct reducer (or combined reducer?)
// mapDispatchToProps()!






const store = createStore(shipReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Astro store={store} />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
store.dispatch({
  type: '@@INIT'
})