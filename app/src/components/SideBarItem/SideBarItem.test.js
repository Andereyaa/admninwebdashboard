import React from 'react';
import ReactDOM from 'react-dom';
import SideBarItem from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarItem onClick={()=>{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
