import React from 'react';
import ReactDOM from 'react-dom';
import SuppliersTableCell from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuppliersTableCell />, div);
  ReactDOM.unmountComponentAtNode(div);
});
