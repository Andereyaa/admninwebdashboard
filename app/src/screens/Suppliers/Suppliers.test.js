import React from 'react';
import ReactDOM from 'react-dom';
import {Suppliers} from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Suppliers />, div);
  ReactDOM.unmountComponentAtNode(div);
});