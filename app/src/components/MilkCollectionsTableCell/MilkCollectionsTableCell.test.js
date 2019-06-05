import React from 'react';
import ReactDOM from 'react-dom';
import MilkCollectionsTableCell from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MilkCollectionsTableCell />, div);
  ReactDOM.unmountComponentAtNode(div);
});
