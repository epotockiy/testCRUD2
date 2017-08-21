import React                        from 'react';
import ReactPaginate                from 'react-paginate';
import PropTypes                    from 'prop-types';
import { connect                  } from 'react-redux';
import { Tweet                    } from './Tweet';
import { Loader                   } from './Loader';
import * as dataReducerActions      from './../actions/DataReducerActions';

class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      numberOfUsers: 0,
      activePage: 1,
      itemsPerPage: 10,
      isDataLoaded: false
    };
  }

  componentDidMount() {
    this.setState({
      activePage: this.props.match.params.page
    });

    if (!this.props.tweets.length || !this.props.match.params.page) {
      this.props.getAllTweets()
        .then(() => {
          this.props.getTweets(this.props.match.params.page || 1, this.state.itemsPerPage);
        });
    }
  }

  handlePageChange(data) {
    this.setState({
      activePage: data.selected + 1
    }, () => {
      this.props.history.push('/tweets/' + this.state.activePage, this.state.itemsPerPage);
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

            <div className="w-100">
              <ReactPaginate
                previousLabel='Previous'
                nextLabel='Next'
                breakLabel={<a href="#" onClick={e => e.preventDefault()}>...</a>}
                breakClassName='page-link'
                initialPage={+this.state.activePage - 1}
                pageCount={this.props.numberOfTweets / this.state.itemsPerPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
                containerClassName='pagination pagination-lg justify-content-center mt-3'
                disableInitialCallback={true}
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
        ) : (
          <Loader/>
        )}
      </div>
    );
  }
}

TweetList.propTypes = {
  tweets:          PropTypes.array,
  numberOfTweets:  PropTypes.number,
  isFetching:      PropTypes.bool,
  history:         PropTypes.object,
  match:           PropTypes.object,
  setCurrentTweet: PropTypes.func,
  deleteTweet:     PropTypes.func,
  getTweets:       PropTypes.func,
  getAllTweets:    PropTypes.func,
  requestData:     PropTypes.func
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
    tweets:         state.tweets,
    numberOfTweets: state.numberOfTweets
  };
};

const mapDispatchToProps = {
  setCurrentTweet: dataReducerActions.setCurrentTweet,
  getTweets:       dataReducerActions.getTweets,
  getAllTweets:    dataReducerActions.getAllTweets,
  deleteTweet:     dataReducerActions.deleteTweet,
  requestData:     dataReducerActions.requestData
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
