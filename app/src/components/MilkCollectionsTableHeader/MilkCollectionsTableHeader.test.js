import React from 'react';
import ReactDOM from 'react-dom';
import MilkCollectionsTableHeader from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MilkCollectionsTableHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
