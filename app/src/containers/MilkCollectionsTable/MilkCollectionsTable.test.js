import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow'

import {MilkCollectionsTable} from './index';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<MilkCollectionsTable />);
});