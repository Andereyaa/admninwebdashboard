import React from 'react';
import ReactDOM from 'react-dom';
import CenterTile from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CenterTile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
