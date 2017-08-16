import React from 'react';

export class AddTweetForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleInputTitleChange(event) {
    this.setState({
      inputTitle: event.target.value
    });
  }

  handleInputBodyChange(event) {
    this.setState({
      inputBody: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="m-3 text-center">Post new tweets</h3>

        <form className="m-2">
          <div className="row justify-content-center">
            <div className="form-group col-md-3">
              <input type="text"
                     id="tweet-title"
                     className="form-control"
                     placeholder="Title"
              />
              {/*<div *ngIf="addTweetForm.controls['tweetTitle'].errors && addTweetForm.controls['tweetTitle'].touched"
                   className="alert alert-danger">
                Please, enter tweet title.
              </div>*/}
            </div>

            <div className="form-group col-md-5">
              <input type="text"
                     id="tweet-body"
                     className="form-control"
                     placeholder="Text"
              />

              {/*<div *ngIf="addTweetForm.controls['tweetBody'].errors && addTweetForm.controls['tweetBody'].touched"
                   className="alert alert-danger">
                Please, enter tweet text.
              </div>*/}
            </div>

            <div className="col-md-1">
              <button type="submit"
                      className="btn btn-danger">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
