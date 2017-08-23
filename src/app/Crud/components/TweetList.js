import React                   from 'react';
import PropTypes               from 'prop-types';
import InfiniteScroll          from 'react-infinite-scroller';
import { connect             } from 'react-redux';
import { Loader              } from './Loader';
import Tweet                   from './Tweet';
import * as dataReducerActions from './../actions/DataReducerActions';

class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      page: 0,
      hasMoreItems: true
    };
  }

  componentDidMount() {
    if (!this.props.tweets.length) {
      this.props.getAllTweets();
    }
  }

  getNextTweets() {
    const newTweets = this.props.tweets.slice(this.state.page * this.props.itemsPerPage, (this.state.page + 1) * this.props.itemsPerPage);

    if (this.props.tweets.length && !newTweets.length) {
      this.setState({
        hasMoreItems: false,
        tweets: this.props.tweets
      });

      return;
    }

    this.setState({
      tweets: [
        ...this.state.tweets,
        ...newTweets
      ],
      page: this.state.page + 1
    });
  }

  render() {
    return (
      <div>
        <h3 className='text-center mt-3'>Tweets:</h3>
        {!this.props.isFetching ? (
          <div className='row'>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getNextTweets.bind(this)}
              hasMore={this.state.hasMoreItems}
            >
              {this.state.tweets.map((tweet, index) => {
                return (
                  <Tweet
                    key={index}
                    index={index}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Loader/>
        )}
      </div>
    );
  }
}

TweetList.propTypes = {
  tweets:         PropTypes.array,
  itemsPerPage:   PropTypes.number,
  isFetching:     PropTypes.bool,
  getAllTweets:   PropTypes.func.isRequired
};

TweetList.defaultProps = {
  tweets: [],
  numberOfTweets: 0,
  isFetching: true,
  history: {}
};

const mapStateToProps = (state) => {
  return {
    isFetching:   state.isFetching,
    itemsPerPage: state.itemsPerPage,
    tweets:       state.tweets
  };
};

const mapDispatchToProps = {
  getAllTweets:    dataReducerActions.getAllTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
