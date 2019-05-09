import React from 'react';
import ReactDOM from 'react-dom';
import RoundedButton from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoundedButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
