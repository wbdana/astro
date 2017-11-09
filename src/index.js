import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Astro from './Astro';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Astro />, document.getElementById('root'));
registerServiceWorker();
