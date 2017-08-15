var PostBox = React.createClass({
	getInitialState: function() {
	  return {data: []};
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
				<PostForm />
			</div>
			);
	}
});

var PostList = React.createClass({
	render: function() {
		var data = this.props.data;
		var PostListTemplate = data.map(function(item) { 
      return (
        <Post text={item.text} key={item.id} />
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
	render: function() {
		return (
			<div className="post">
				<p className="post-text">
					{this.props.text}
				</p>
			</div>
		);
	}
});

var PostForm = React.createClass({
	render: function() {
		return (
			<div className="post-form">
			Hello, world! I am a postForm.
			</div>
			);
	}
});



ReactDOM.render(
	<PostBox />,
	document.getElementById('content')
	);