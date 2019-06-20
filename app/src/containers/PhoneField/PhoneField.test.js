import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'

import {PhoneField} from './index';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<PhoneField />);
});