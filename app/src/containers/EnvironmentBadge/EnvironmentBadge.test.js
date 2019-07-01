import React from 'react';
import ReactDOM from 'react-dom';
import {EnvironmentBadge} from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EnvironmentBadge />, div);
  ReactDOM.unmountComponentAtNode(div);
});
