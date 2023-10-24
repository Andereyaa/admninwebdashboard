import React from 'react';
import {Dashboard} from './index';
import ShallowRenderer from 'react-test-renderer/shallow'


it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Dashboard />);
});