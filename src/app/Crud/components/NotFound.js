import React     from 'react';
import { Link }  from 'react-router-dom';
import {
  Card,
  CardBlock,
  CardHeader,
  Nav,
  NavItem
} from 'reactstrap';

export const NotFound = () => {
  return (
    <div className="row justify-content-center m-5">
      <Card color='info' className="border-info text-center">
        <CardHeader>
          <h1 className="display-2 mt-3 text-info">404</h1>
          <h2 className="display-4 text-info">NOT FOUND</h2>
        </CardHeader>
        <CardBlock className='m-3'>
          <h4>The page you are looking for does not exist</h4>
          <div className="row">
            <Nav pills className='ml-auto mr-auto mt-3'>
              <NavItem>
                <Link to='/tweets/1' className="nav-link">Go home</Link>
              </NavItem>
              <NavItem>
                <Link to='/form/add' className="nav-link">Add new post</Link>
              </NavItem>
              <NavItem>
                <Link to='/users' className="nav-link">Users</Link>
              </NavItem>
            </Nav>
          </div>
        </CardBlock>
      </Card>
    </div>
  );
};
