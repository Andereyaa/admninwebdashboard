import React from 'react';
import ReactDOM from 'react-dom';
import SuppliersTableRow from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuppliersTableRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});
