import React from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoadingScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});