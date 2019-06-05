import React from 'react';
import ReactDOM from 'react-dom';
import MilkCollectionsTableRow from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MilkCollectionsTableRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});
