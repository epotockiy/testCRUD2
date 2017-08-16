import React from 'react';

export class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch('http://jsonplaceholder.typicode.com/users/' + this.props.match.params.id)
        .then(res => res.json())
        .then(user => {
          this.setState({
            user: user
          });
        });
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="card col-4 ml-auto mr-auto">
          <img className="card-img-top" src="http://pngimages.net/sites/default/files/users--blue-flag-png-image-100720.png" alt="Card image cap" />
            <div className="card-body">
              <h4 className="card-title">{this.state.user.name}</h4>
              <p className="card-text">Nickname: {this.state.user.username}</p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
        </div>
      </div>
    );
  }
}
