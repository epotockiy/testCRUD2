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
    if (!this.props.tweets.length || !this.props.match.params.page) {
      this.props.getAllTweets();
    }
  }

  getNextTweets() {
    if(this.state.hasMoreItems) {
      this.setState({
        page: this.state.page + 1,
        tweets: [
          ...this.state.tweets,
          ...this.props.tweets.slice(this.state.page * this.props.itemsPerPage, (this.state.page + 1) * this.props.itemsPerPage)
        ]
      });
    } else {
      if (this.state.tweets.length + this.props.itemsPerPage >= this.props.tweets.length) {
        console.log('false');
        this.setState({
          hasMoreItems: false
        });
      }
    }
  }

  render() {
    return (
      <div>
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
                    key={index + Math.random().toString(32).substr(2, 5)}
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
  match:          PropTypes.object,
  getAllTweets:   PropTypes.func.isRequired
};

TweetList.defaultProps = {
  tweets: [],
  numberOfTweets: 0,
  isFetching: true,
  history: {},
  match: {}
};

const mapStateToProps = (state) => {
  return {
    isFetching:     state.isFetching,
    itemsPerPage:   state.itemsPerPage,
    tweets:         state.tweets
  };
};

const mapDispatchToProps = {
  getAllTweets:    dataReducerActions.getAllTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
