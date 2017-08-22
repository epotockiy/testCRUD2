import React       from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';

export const Header = () => {
  return (
    <div>
      <Navbar className='navbar-expand-lg navbar-dark bg-primary'>
        <Nav navbar>
          <NavItem>
            <NavLink className='nav-item nav-link' activeClassName='active' to='/tweets'>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='nav-item nav-link' activeClassName='active' to='/form/add'>Add post</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='nav-item nav-link' activeClassName='active' to='/users'>Users</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};
