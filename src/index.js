import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './store.js';

const store = configureStore(window._INITIAL_STATE_);

export const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root />,document.getElementById('root'));
registerServiceWorker();
