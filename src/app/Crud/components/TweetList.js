import React                        from 'react';
import { connect                  } from 'react-redux';
import { Tweet                    } from './Tweet';
import { Loader                   } from './Loader';
import ReactPaginate                from 'react-paginate';
import PropTypes                    from 'prop-types';
import * as dataReducerActions      from './../actions/DataReducerActions';

class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      numberOfPosts: null,
      numberOfUsers: 0,
      activePage: 1,
      itemsPerPage: 10,
      isDataLoaded: false
    };
  }

  componentDidMount() {
    this.props.getAllTweets()
      .then(() => {
        this.setState({
          numberOfPosts: this.props.tweets.length
        }, () => {
          this.props.getTweets();
        });
      });
  }

  handlePageChange(data) {
    this.setState({
      activePage: data.selected + 1
    }, () => {
      this.props.getTweets(this.state.activePage, this.state.itemsPerPage);
    });
  }

  render() {
    return (
      <div>
        {!this.props.isFetching ? (
          <div className="row">
            {this.props.tweets.map((tweet, index) => {
              return (
                <Tweet
                  key={tweet.id + Math.random().toString(32).substr(2, 5)}
                  tweet={tweet}
                  onDeleteClick={() => { this.props.deleteTweet(index); }}
                  setCurrentTweet={() => {
                    this.props.requestData();
                    this.props.setCurrentTweet(index);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <Loader/>
        )}
        <div className="w-100">
          <ReactPaginate
            previousLabel='Previous'
            nextLabel='Next'
            breakLabel={<a href="#" onClick={e => e.preventDefault()}>...</a>}
            breakClassName='page-link'
            pageCount={this.state.numberOfPosts / this.state.itemsPerPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            containerClassName='pagination pagination-lg justify-content-center mt-3'
            pageClassName='page-item'
            nextClassName='page-item'
            previousClassName='page-item'
            pageLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextLinkClassName='page-link'
            activeClassName='active'
          />
        </div>
      </div>
    );
  }
}

TweetList.propTypes = {
  tweets: PropTypes.array,
  comments: PropTypes.array,
  setTweets: PropTypes.func,
  setComments: PropTypes.func,
  setCurrentTweet: PropTypes.func,
  deleteTweet: PropTypes.func,
  getTweets: PropTypes.func,
  getAllTweets: PropTypes.func,
  setCurrentUser: PropTypes.func,
  requestData: PropTypes.func,
  isFetching: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    tweets: state.tweets,
    comments: state.comments
  };
};

const mapDispatchToProps = {
  setTweets: dataReducerActions.setTweets,
  setComments: dataReducerActions.setComments,
  setCurrentTweet: dataReducerActions.setCurrentTweet,
  getTweets: dataReducerActions.getTweets,
  getAllTweets: dataReducerActions.getAllTweets,
  deleteTweet: dataReducerActions.deleteTweet,
  requestData: dataReducerActions.requestData,
  setCurrentUser: dataReducerActions.setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
