import React                   from 'react';
import { connect             } from 'react-redux';
import PropTypes               from 'prop-types';
import * as dataReducerActions from './../actions/DataReducerActions';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';

class CrudForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: '',
      inputUser: 1
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }
    if (this.state.type !== 'comment' && this.props.match.params.type === 'edit') {
      this.setState({
        inputTitle: this.props.tweets[this.props.currentTweet].title,
        inputBody:  this.props.tweets[this.props.currentTweet].body,
        inputUser:  this.props.tweets[this.props.currentTweet].userId
      });
    }
  }

  handleInputChange(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    return (
      <div className='col-10 mr-auto ml-auto mt-3'>
        <Form>
          <FormGroup>
            <Label for='title' className='h4'>Title</Label>
            <Input
              type='text'
              id='title'
              value={this.state.inputTitle}
              onChange={(e) => this.handleInputChange(e, 'inputTitle')}
            />
          </FormGroup>

          <FormGroup>
            <Label for='body' className='h4'>Text</Label>
            <Input
              type='textarea'
              id='body'
              rows='5'
              value={this.state.inputBody}
              onChange={(e) => this.handleInputChange(e, 'inputBody')}
            />
          </FormGroup>

          {(this.props.type !== 'comment') ? (
            <FormGroup>
              <Label htmlFor='user' className='h4'>User id</Label>
              <Input
                type='select'
                id='user'
                value={this.state.inputUser}
                onChange={(e) => this.handleInputChange(e, 'inputUser')}
              >
                {this.props.users.map((user, index) => <option key={index} value={user.id}>{user.id} {user.name}</option>)}
              </Input>
            </FormGroup>
          ) : null}

          <Button
            color='primary'
            onClick={(event) => {
              event.preventDefault();

              if (this.props.type === 'comment') {
                this.props.onSubmitClick({
                  title: this.state.inputTitle,
                  body:  this.state.inputBody,
                  user:  this.state.inputUser
                });

                this.setState({
                  inputTitle: '',
                  inputBody: '',
                  inputUser: 1
                });
              } else {
                if (this.props.match.params.type === 'edit') {
                  this.props.updateTweet({
                    userId: this.state.inputUser,
                    id: this.props.tweets[this.props.currentTweet].id,
                    title: this.state.inputTitle,
                    body: this.state.inputBody
                  }, this.props.currentTweet)
                    .then(() => {
                      this.props.history.push('/tweet-detail/' + this.props.tweets[this.props.currentTweet].id);
                    });
                } else {
                  if (this.props.match.params.type === 'add') {
                    this.props.addTweet({
                      userId: this.state.inputUser,
                      id: Math.floor(Math.random() * 100 + 500),
                      title: this.state.inputTitle,
                      body: this.state.inputBody
                    })
                      .then(() => {
                        this.props.history.push('/tweets/1');
                      });
                  }
                }
              }
            }}
            disabled={!this.state.inputTitle.length || !this.state.inputBody.length}>
            {this.state.type === 'comment' ? 'Save' : 'Post'}
          </Button>

          {this.props.type !== 'comment' ? (
            <Button
              color='danger'
              className='ml-3'
              onClick={() => {
                if (this.props.match.params.type === 'edit') {
                  this.props.history.push('/tweet-detail/' + this.props.tweets[this.props.currentTweet].id);
                } else {
                  if (this.props.match.params.type === 'add') {
                    this.props.history.push('/tweets');
                  }
                }
              }}
            >
              Cancel
            </Button>
          ) : null}
        </Form>
      </div>
    );
  }
}

CrudForm.propTypes = {
  type:          PropTypes.string,
  history:       PropTypes.object,
  match:         PropTypes.object,
  currentTweet:  PropTypes.number,
  tweets:        PropTypes.array,
  users:         PropTypes.array,
  onSubmitClick: PropTypes.func,
  getUsers:      PropTypes.func,
  updateTweet:   PropTypes.func,
  addTweet:      PropTypes.func
};

CrudForm.defaultProps = {
  type:          '',
  history:       {},
  match:         { params: { type: '' } },
  currentTweet:  1,
  tweets:        []
};

const mapStateToProps = (state) => {
  return {
    tweets:       state.tweets,
    users:        state.users,
    currentTweet: state.currentTweet
  };
};

const mapDispatchToProps = {
  updateTweet: dataReducerActions.updateTweet,
  addTweet:    dataReducerActions.addTweet,
  getUsers:    dataReducerActions.getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(CrudForm);
