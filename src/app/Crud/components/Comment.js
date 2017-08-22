import React     from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as dataReducerActions from './../actions/DataReducerActions';
import {
  Card,
  CardBlock,
  CardHeader,
  Button,
  Input
} from 'reactstrap';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onCommentEdit     = this.onCommentEdit.bind(this);

    this.state = {
      isEditing: false,
      commentInput: ''
    };
  }

  onCommentEdit(event) {
    event.preventDefault();

    if (this.state.isEditing) {
      this.props.updateComment(
        {
          ...this.props.comments[this.props.index],
          body: this.state.commentInput
        },
        this.props.index
      );
    }

    if (this.state.commentInput.length) {
      this.props.comments[this.props.index].body = this.state.commentInput;
    } else {
      this.setState({
        commentInput: this.props.comments[this.props.index].body
      });
    }

    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleInputChange(event) {
    this.setState({
      commentInput: event.target.value
    });
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-md-8 col-sm-10'>
          <Card className='m-2'>
            <CardHeader>
              <h5>#{this.props.comments[this.props.index].id} {this.props.comments[this.props.index].name}</h5>
              <p>By: <strong>{this.props.comments[this.props.index].email}</strong></p>
            </CardHeader>

            <CardBlock className='p-3'>
              {this.state.isEditing ? (
                <div className='form-group'>
                  <Input type='textarea'
                    name='comment'
                    rows='3'
                    value={this.state.commentInput}
                    onChange={this.handleInputChange}>
                  </Input>
                </div>
              ) : (
                <p>{this.props.comments[this.props.index].body}</p>
              )}

              <Button
                color='primary'
                onClick={this.onCommentEdit}>
                {this.state.isEditing ? 'Save' : 'Edit'}
              </Button>
              <Button
                color='danger'
                onClick={(e) => { e.preventDefault(); this.props.deleteComment(this.props.index); }}
                className='ml-2'>
                Delete
              </Button>
            </CardBlock>
          </Card>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  index:         PropTypes.number,
  comments:      PropTypes.array,
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

Comment.defaultProps = {
  index: 0,
  comments: []
};

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = {
  updateComment: dataReducerActions.updateComment,
  deleteComment: dataReducerActions.deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
