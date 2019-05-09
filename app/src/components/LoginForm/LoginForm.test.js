import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
