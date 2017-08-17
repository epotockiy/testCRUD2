import React      from 'react';
import { Link   } from 'react-router-dom';
import { Loader } from './Loader';

export class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isDataLoaded: false
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
          isDataLoaded: true
        });
      });
  }

  render() {
    return (
      <div className="row m-3">
        {this.state.isDataLoaded ? (
          <div className="col-5 ml-auto mr-auto">
            <h3 className="text-center mb-2">All users:</h3>
            <div className="list-group">
              {this.state.users.map(user => {
                return (
                  <Link className="list-group-item list-group-item-action"
                        key={user.id}
                        to={'/user/' + user.id}>
                    {user.id}) {user.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <Loader/>
        )}
      </div>
    );
  }
}
