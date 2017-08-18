import React                        from 'react';
import { connect                  } from 'react-redux';
import { Tweet                    } from './Tweet';
import { Loader                   } from './Loader';
import { _getTweets, _deleteTweet } from './TweetService';
import ReactPaginate                from 'react-paginate';
import * as crudReducerActions      from './../actions/CrudReducerActions';

class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      activePage: 1,
      itemsPerPage: 10,
      isDataLoaded: false
    };
  }

  componentDidMount() {
    this.getTweets();
  }

  getTweets() {
    if (!this.props.tweets.length) {
      _getTweets()
        .then(
          tweets => {
            this.props.setTweets(tweets);
            this.setState({
              isDataLoaded: true
            });
          }
        );
    } else {
      this.setState({
        isDataLoaded: true
      });
    }
  }

  onDeleteClick(id) {
    console.log('deleting tweet #' + id);

    _deleteTweet()
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

  handlePageChange(data) {
    this.setState({
      activePage: data.selected + 1
    });
  }

  render() {
    return (
      <div>
        {this.state.isDataLoaded ? (
          <div className="row">
            {this.props.tweets.map((tweet, index) => {
              if (index >= (this.state.activePage - 1) * this.state.itemsPerPage &&
                  index < this.state.activePage * this.state.itemsPerPage) {
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
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={<a href="#" onClick={ (e) => e.preventDefault() }>...</a>}
                breakClassName={"page-link"}
                pageCount={this.props.tweets.length / this.state.itemsPerPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
                containerClassName={"pagination pagination-lg justify-content-center mt-3"}
                pageClassName={"page-item"}
                nextClassName={"page-item"}
                previousClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
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
