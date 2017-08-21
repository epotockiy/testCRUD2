import React              from 'react';
import PropTypes          from 'prop-types';
import {
  Card,
  CardBlock,
  CardHeader,
  Button,
  Input
} from 'reactstrap';

export class Comment extends React.Component {
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
      this.props.onUpdateComment(this.state.commentInput);
    }

    if (this.state.commentInput.length) {
      this.props.comment.body = this.state.commentInput;
    } else {
      this.setState({
        commentInput: this.props.comment.body
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
              <h5>#{this.props.comment.id} {this.props.comment.name}</h5>
              <p>By: <strong>{this.props.comment.email}</strong></p>
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
                <p>{this.props.comment.body}</p>
              )}

              <Button
                color='primary'
                onClick={this.onCommentEdit}>
                {this.state.isEditing ? 'Save' : 'Edit'}
              </Button>
              <Button
                color='danger'
                onClick={(e) => { e.preventDefault(); this.props.onDeleteComment(); }}
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
  comment: PropTypes.object,
  onDeleteComment: PropTypes.func,
  onUpdateComment: PropTypes.func
};

Comment.defaultProps = {
  comment: {}
};
