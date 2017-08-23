import React                   from 'react';
import PropTypes               from 'prop-types';
import { Link                } from 'react-router-dom';
import { connect             } from 'react-redux';
import { Loader              } from './Loader';
import Tweet                   from './Tweet';
import * as dataReducerActions from './../actions/DataReducerActions';
import {
  Card,
  CardBlock
} from 'reactstrap';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserTweets(this.props.match.params.id);
  }

  render() {
    return (
      <div className="container mt-3">
        <Link className='btn btn-primary mb-3' to='/users'>Back</Link>

        {!this.props.isFetching ? (
          <Card className="col-12 ml-auto mr-auto">
            <CardBlock>
              <img
                className="rounded float-left m-3"
                style={{'width': '10em'}}
                src="http://pngimages.net/sites/default/files/users--blue-flag-png-image-100720.png"
                alt="Card image cap"
              />
              <div className="mt-3 mb-3 ml-5 mr-5">
                <h4 className="card-title">{this.props.users[this.props.match.params.id - 1].name}</h4>
                <h6 className="card-text">Nickname: {this.props.users[this.props.match.params.id - 1].username}</h6>
                <h5 className="card-text">Email: {this.props.users[this.props.match.params.id - 1].email}</h5>
                <h6 className="card-text">Address: {this.props.users[this.props.match.params.id - 1].address.street}, {this.props.users[this.props.match.params.id - 1].address.suite}</h6>
              </div>
            </CardBlock>

            <CardBlock>
              <h4 className="text-center">Tweets:</h4>
              <div className="row">
                {this.props.userTweets.map((tweet, index) =>
                  <Tweet
                    key={index}
                    index={index}
                  />
                )}
              </div>
            </CardBlock>
          </Card>
        ) : (
          <Loader/>
        )}
      </div>
    );
  }
}

User.propTypes = {
  userTweets:      PropTypes.array,
  users:           PropTypes.array,
  isFetching:      PropTypes.bool,
  match:           PropTypes.object,
  getUserTweets:   PropTypes.func.isRequired
};

User.dafaultProps = {
  userTweets: [],
  users: [],
  isFetching: true,
  match: {}
};

const mapStateToProps = (state) => {
  return {
    userTweets:   state.tweets,
    users:        state.users,
    isFetching:   state.isFetching
  };
};

const mapDispatchToProps = {
  getUserTweets:    dataReducerActions.getUserTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
