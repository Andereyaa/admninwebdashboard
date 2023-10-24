import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { configureStore, persistor } from './store/configureStore';
import Root from './containers/Root';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(<Root store={store} persistor={persistor}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
