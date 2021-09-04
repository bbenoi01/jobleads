import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './index/appIndex';
import rootStore from './root-store';

render(
  <Provider store={ rootStore }>
    <App />
  </Provider>,
  document.getElementById('root')
);