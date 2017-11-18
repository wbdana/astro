import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import Astro from './Astro';
import registerServiceWorker from './registerServiceWorker';

const store = createStore()

ReactDOM.render(<Astro />, document.getElementById('root'));
registerServiceWorker();
