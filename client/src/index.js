import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppointmentsPage from './containers/AppointmentsPage/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppointmentsPage />, document.getElementById('root'));
registerServiceWorker();
