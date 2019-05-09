import React from 'react';
import ReactDOM from 'react-dom';
import LogoTitle from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogoTitle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
