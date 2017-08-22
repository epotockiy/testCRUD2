import React                   from 'react';
import PropTypes               from 'prop-types';
import { connect             } from 'react-redux';
import { Link                } from 'react-router-dom';
import { Loader              } from './Loader';
import * as dataReducerActions from './../actions/DataReducerActions';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }
  }

  render() {
    return (
      <div className="row m-3">
        {!this.props.isFetching ? (
          <div className="col-5 ml-auto mr-auto">
            <h3 className="text-center mb-2">All users:</h3>
            <div className="list-group">
              {this.props.users.map(user => {
                return (
                  <Link
                    className="list-group-item list-group-item-action"
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

UserList.propTypes = {
  users:      PropTypes.array,
  isFetching: PropTypes.bool,
  getUsers:   PropTypes.func.isRequired
};

UserList.defaultProps = {
  users: [],
  isFetching: true
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = {
  getUsers: dataReducerActions.getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
