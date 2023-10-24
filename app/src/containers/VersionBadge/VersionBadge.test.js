import React from 'react';
import ReactDOM from 'react-dom';
import {VersionBadge} from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VersionBadge />, div);
  ReactDOM.unmountComponentAtNode(div);
});
