import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow'

import {CenterSelect} from './index';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<CenterSelect />);
});