import React from 'react';
import ReactDOM from 'react-dom';
import SuppliersTableHeader from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuppliersTableHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
