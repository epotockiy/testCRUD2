var PostBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  handleCommentSubmit: function(comment) {
    'use strict';

    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    fetch("/posts",
    {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
       })
      .then(function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this))
  },

  componentDidMount: function() {
   'use strict';

    fetch("/posts")
      .then(function(response) {
        return response.json();
       })
      .then(function(data) {
        this.setState({data: data});
      }.bind(this))
      .catch( alert );
  },


  render: function() {
    return (
      <div className="post-box">
        <h1>Posts</h1>
        <PostList data={this.state.data}/>
        <PostForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
      );
  }
});

var PostList = React.createClass({
  render: function() {
    var data = this.props.data;
    var PostListTemplate = data.map(function(item) {
      return (
        <Post text={item.text} id={item.id} key={item.id} />
      );
    });
    return (
      <div className="post-list">
        {PostListTemplate}
      </div>
      );
  }
});

var Post = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
   'use strict';

    fetch("/posts/" + this.props.id + "/comments")
      .then(function(response) {
        return response.json();
       })
      .then(function(data) {
        this.setState({data: data});
      }.bind(this))
      .catch( alert );
  },

  render: function() {
    return (
      <div className="post">
        <p className="post-text">
          {this.props.text}
        </p>
        <CommentList data={this.state.data}/>
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({text: text});
    this.setState({text: ''});
  },

  render: function() {
    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
      );
  }
});

var CommentList = React.createClass({
  render: function() {
    var data = this.props.data;
    var CommentListTemplate = data.map(function(item) {
      return (
        <Comment name={item.name} body={item.body} key={item.id} />
      );
    });
    return (
      <div className="comment-list">
        <h2>Comments</h2>
        {CommentListTemplate}
      </div>
      );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p className="comment-name">
          {this.props.name}
        </p>
        <p className="comment-body">
          {this.props.body}
        </p>
      </div>
    );
  }
});

ReactDOM.render(
  <PostBox />,
  document.getElementById('content')
  );