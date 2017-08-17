import React       from 'react';
import { connect } from 'react-redux';
import { Tweet   } from './Tweet';
import * as crudReducerActions from './../actions/CrudReducerActions';
import Pagination from 'react-js-pagination';

class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      activePage: 1,
      itemsPerPage: 10
    };
  }

  componentDidMount() {
    this.getTweets();
  }

  getTweets() {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        tweets => {
          this.props.setTweets(tweets);
        }
      );
  }

  onDeleteClick(id) {
    console.log('deleting tweet #' + id);

    fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < this.props.tweets.length; ++i) {
          if (this.props.tweets[i].id === id) {
            this.props.setTweets([
              ...this.props.tweets.slice(0, i),
              ...this.props.tweets.slice(i + 1)
            ]);
            break;
          }
        }
      });
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  render() {
    return (
      <div className="row">
        {this.props.tweets.map(tweet => {
          if (tweet.id >= (this.state.activePage - 1) * this.state.itemsPerPage &&
              tweet.id <= this.state.activePage * this.state.itemsPerPage) {
            return (
              <Tweet
                key={tweet.id + Math.random().toString(32).substr(2, 5)}
                tweet={tweet}
                onDeleteClick={this.onDeleteClick.bind(this, tweet.id)}
                setCurrentTweet={() => { this.props.setCurrentTweet(tweet.id); }}
              />
            );
          }
        })}
        <div className="w-100">
          <Pagination
            innerClass="pagination pagination-lg justify-content-center mt-3"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="active"
            prevPageText="Previous"
            nextPageText="Next"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.props.tweets.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    comments: state.comments
  }
};

const mapDispatchToProps = {
  setTweets: crudReducerActions.setTweets,
  setComments: crudReducerActions.setComments,
  setCurrentTweet: crudReducerActions.setCurrentTweet
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
